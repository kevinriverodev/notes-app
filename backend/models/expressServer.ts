import express, { Application, Router } from 'express';

class ExpressServer {
    private app: Application;
    private port: string;

    constructor(port?: string) {
        this.app = express();  
        port ?  this.port = port : this.port = process.env.PORT || '8080';
    }

    setStaticPath(path: string = 'public') {
        this.app.use(express.static(path));
    }

    setMiddleware(middleware: Function) {
        this.app.use(middleware());
    }

    setMiddlewares(middlewares: Function[]) {
        middlewares.forEach(middleware => {
            this.app.use(middleware());
        });
    }

    setRoute(path: string, router: Router) {
        this.app.use(path, router);
    }

    setRoutes(routes: { path: string, router: Router }[]) {
        routes.forEach(route => {
            this.app.use(route.path, route.router);
        });
    }

    listen() {
        this.app.listen(this.port, () => { console.log(`Server running in port: ${ this.port }`) });
    }
}

export default ExpressServer;