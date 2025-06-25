/**
 * @private
 */
export declare class DeepMapEntry<T> {
    private base;
    private args;
    private version;
    private versionChecker;
    private root;
    private closest;
    private closestIdx;
    constructor(base: Map<any, any>, args: any[], version: number, versionChecker: (version: number) => boolean);
    exists(): boolean;
    get(): T;
    set(value: T): void;
    delete(): void;
    private assertCurrentVersion;
}
/**
 * @private
 */
export declare class DeepMap<T> {
    private store;
    private argsLength;
    private currentVersion;
    private checkVersion;
    entry(args: any[]): DeepMapEntry<T>;
}
