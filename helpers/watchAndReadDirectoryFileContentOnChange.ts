import {watch} from 'fs/promises';
import {readFile} from 'read-file-safe';
import 'log-timestamp'

type TCallback = (fileContent: string | undefined, fileName: string) => void

export const watchAndReadDirectoryFileContentOnChange = async (dirPath: string | undefined, callback: TCallback) => {
    if (!dirPath) return;
    try {
        const watcher = watch(dirPath);
        for await (const event of watcher) {
            let {filename} = event;
            if (filename.endsWith('.md') || filename.endsWith('.md~')) {
                // Some flaws with watch, sometimes just gives back the filename~
                if (filename.endsWith('~')) {
                    const neededCharsList = filename.split('');
                    neededCharsList.pop();
                    filename = neededCharsList.join('');
                }
                const fileContent: string | undefined = await readFile(`${dirPath}/${filename}`);
                if (!fileContent) callback(undefined, filename);
                else callback(fileContent, filename);
            }
        }
    } catch (err) {
        console.error('Oops, something went wrong', err)
        return;
    }
}