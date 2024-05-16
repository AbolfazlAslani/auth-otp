export declare enum ConfigKeys {
    App = "App",
    Db = "Db"
}
export declare const Configuration: ((() => {
    port: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
}>)[];
