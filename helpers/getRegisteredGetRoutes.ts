import {Express} from "express";

export const getRegisteredGetRoutes = (app: Express) => {
    const registeredGetRoutes = new Set<string>();

    app._router.stack.forEach((middleware: any) => {
        if (middleware.route && middleware.route.methods.get) { // routes registered directly on the app
            registeredGetRoutes.add(middleware.route.path);
        } else if (middleware.name === 'router') { // router middleware
            middleware.handle.stack.forEach((handler: any) => {
                if (handler.route && handler.route.methods.get) {
                    registeredGetRoutes.add(handler.route.path);
                }
            });
        }
    })

    return registeredGetRoutes;
}