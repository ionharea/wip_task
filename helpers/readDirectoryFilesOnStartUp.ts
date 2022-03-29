import {readdir, readFile} from 'fs/promises'

type TFileInfo = { fileContent: string, fileName: string };

export const readDirectoryFilesOnStartUp = async (dirPath: string | undefined) => {
    if (!dirPath) return;

    const dirFilesInfo: TFileInfo[] = [];

    try {
        const filenames = await readdir(dirPath);
        for (const filename of filenames) {
            if (filename.endsWith('.md')) {
                try {
                    // Just a showcase of a diff implementation without using readFile from 'read-file-safe';
                    const fileContent = await readFile(`${dirPath}/${filename}`);
                    dirFilesInfo.push({
                        fileContent: Buffer.from(fileContent).toString(),
                        fileName: filename
                    });
                } catch(err) {
                    // Maybe would be better to sue custom messages at different levels, but it's ok for now as there is no logger.
                    console.error('Oops, something went wrong', err)
                }
            }
        }
        return dirFilesInfo;
    } catch (err) {
        console.error('Oops, something went wrong', err)
        return;
    }
}