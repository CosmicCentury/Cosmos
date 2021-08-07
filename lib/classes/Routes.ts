interface RouteOptions {
  setRoutes(obj: any): any;
  retrieveRoutes(): any;
  retrieveGetRoutes(): any;
  retrievePostRoutes(): any;
  retrievePutRoutes(): any;
  retrievePatchRoutes(): any;
  retrieveDeleteRoutes(): any;
}

export default class Routes implements RouteOptions {
  private obj: any;

  setObj(o: any) {
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
