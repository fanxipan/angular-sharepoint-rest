/**
 * Created by Toan on 8/28/2015.
 */

(function (angular, _, $) {

    angular
        .module("fx-sharepoint-restful")
        .provider("fxSharePointRest", [
            function () {
                var config = this.$config = {
                    baseUrl: "",
                    digest: function() {
                        var _digest = $("#__REQUESTDIGEST").val();
                        return function (digest) {
                            if (!_.isUndefined(digest)) {
                                _digest = digest;
                            }
                            return _.isFunction(_digest) ? _digest() : _digest;
                        }
                    }()
                };
                this.setBaseUrl = function (baseUrl) {
                    this.$config.baseUrl = baseUrl;
                };
                this.setRequestDigest = function (digest) {
                    config.digest(digest);
                };
                this.$get = [
                    "Restangular", "SPList",
                    function (Restangular, SPList) {
                        var rest = Restangular.withConfig(function (configurer) {
                            configurer.setBaseUrl(config.baseUrl);
                            configurer.addFullRequestInterceptor(function (data, operation, what, url, headers, params) {
                                // Save or Update.
                                if (_.isObject(data)) {
                                    _.extend(data, {
                                        "__metadata": {
                                            type: String.format("SP.Data.{0}ListItem", listName)
                                        }
                                    });
                                }

                                var request = {
                                    element: data,
                                    headers: _.extend(headers, {
                                        "Accept": "application/json;odata=verbose",
                                    })
                                };

                                if (operation === "post") {
                                    request.headers["X-RequestDigest"] = config.digest();
                                    request.headers["IF-MATCH"] = "*";

                                    if (_.isNumber(data)) { // Delete.
                                        request.headers["X-HTTP-Method"] = "DELETE";
                                    } else {
                                        request.headers["Content-Type"] = "application/json;odata=verbose";
                                        if (data.Id) { // Update.
                                            request.headers["X-HTTP-Method"] = "MERGE";
                                        } else { // Create.
                                            request.headers["X-HTTP-Method"] = "";
                                        }
                                    }
                                }

                                return request;
                            });
                            configurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                                return operation === "getList" ? data.d.results : data.d;
                            });
                            configurer.setRestangularFields({
                                selfLink: "__metadata.uri",
                            });
                        });
                        return {
                            createList: function (listName, configs) {
                                var listRest = rest.all("lists").one(String.format("getByTitle('{0}')", listName));
                                return new SPList(listRest, listName, configs);
                            }
                        };
                    }
                ];
            }
        ]);

})(angular, _, $);
