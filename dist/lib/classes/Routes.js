"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Routes {
    setObj(o) {
        this.obj = o;
    }
    getObj() {
        return this.obj;
    }
    setRoutes(obj) {
        this.setObj(obj);
    }
    retrieveRoutes() {
        return this.getObj();
    }
    retrieveGetRoutes() {
        return this.getObj().GET;
    }
    retrievePostRoutes() {
        return this.getObj().POST;
    }
    retrievePutRoutes() {
        return this.getObj().PUT;
    }
    retrievePatchRoutes() {
        return this.getObj().PATCH;
    }
    retrieveDeleteRoutes() {
        return this.getObj().DELETE;
    }
}
exports.default = Routes;
//# sourceMappingURL=Routes.js.map