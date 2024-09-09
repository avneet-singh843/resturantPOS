export default {
  expo: {
    owner: "avneetsingh317",
    extra: {
      eas: {
        projectId: "b1384722-1fb9-4fe0-a6d9-b558cebc28f5",
      },
    },
    android: {
      package: "com.avneetsingh317.resturantPOS", // This is the missing field
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    cli: {
      appVersionSource: "remote",
    },
    name: "resturantPOS",
    slug: "resturantpos",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
  },
};
