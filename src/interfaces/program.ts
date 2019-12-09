/**
 * Object from commander with command line arguments parsed.
 */
export default interface Program {
    /**
     * If present and set to true then program is in debug mode
     */
    debug?: boolean;

    /**
     * If present can be set as string and as an array of strings.
     * These are the full paths to files with file names to read api specification for.
     */
    input?: string | string[];

    /**
     * If present, sets the path to output folder.
     */
    output: string;
}