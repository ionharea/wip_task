import {Express, Request, Response} from "express";
import {watchAndReadDirectoryFileContentOnChange} from "./watchAndReadDirectoryFileContentOnChange";
import {transformMarkdownToHtml} from "./transformMarkdownToHtml";
// @ts-ignore
import removeRoute from "remove-route-runtime"
import dotenv from "dotenv";
import {readDirectoryFilesOnStartUp} from "./readDirectoryFilesOnStartUp";
import {getRoutePath} from "./getRoutePath";
import {getRegisteredGetRoutes} from "./getRegisteredGetRoutes";

dotenv.config();

const dirPath = process.env.DIR_PATH;

export const setRoutes = async (app: Express) => {

    const dirFilesInfo = await readDirectoryFilesOnStartUp(dirPath);
    if (dirFilesInfo) {
        dirFilesInfo.forEach(fileInfo => {
            const {fileContent, fileName} = fileInfo;
            const routePath = getRoutePath(fileName);
            app.get(routePath, (req: Request, res: Response) => {
                res.send(transformMarkdownToHtml(fileContent));
            });
        })
    }

    await watchAndReadDirectoryFileContentOnChange(dirPath, (fileContent, fileName) => {
        const registeredGetRoutes = getRegisteredGetRoutes(app);
        const routePath = getRoutePath(fileName);
        const matchedRoute = Array.from(registeredGetRoutes).find(path => path === routePath);

        if (fileContent) {
            if (matchedRoute) removeRoute(app, routePath, 'get');
            app.get(routePath, (req: Request, res: Response) => {
                res.send(transformMarkdownToHtml(fileContent));
            });
        } else {
            // The file was removed from the directory
            removeRoute(app, routePath, 'get');
        }
    });

};

