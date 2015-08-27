/**
 * Created by Toan on 8/28/2015.
 */

(function(angular, _) {
    "use strict";

    angular
        .module("fx-sharepoint-restful")
        .factory("SPList", [
            function () {
                var DEFAULTS_CONFIGS = {
                    params: {},
                    headers: {}
                };
                var SPList = function (restangular, listName, configs) {
                    this.$restangular = restangular;
                    this.$listName = listName;
                    this.$configs = _.defaultsDeep(configs, DEFAULTS_CONFIGS);
                };

                SPList.prototype.get = function (id, params, headers) {
 
                };
                SPList.prototype.getList = function (params, headers) {

                };
                SPList.prototype.save = function (items, params, headers) {

                };
                SPList.prototype.delete = function (itemIds, params, headers) {

                };

                return SPList;
            }
        ]);

})(angular, _);