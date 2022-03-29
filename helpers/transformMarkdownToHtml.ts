import showdown from "showdown";

export const transformMarkdownToHtml = (fileContent: string) => {
    const converter = new showdown.Converter();
    return converter.makeHtml(fileContent)
}