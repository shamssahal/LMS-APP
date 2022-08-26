export let ROOT_URL;
if (process.env.REACT_APP_ENV === "production") {
    ROOT_URL = "https://api.uvihealth.in";
} else if (process.env.REACT_APP_ENV === "staging") {
    ROOT_URL = "https://apistage.uvihealth.in";
} else {
    ROOT_URL = "http://localhost:3000";
}
