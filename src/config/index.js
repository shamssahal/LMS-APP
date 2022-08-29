export let ROOT_URL;
if (process.env.REACT_APP_ENV === "production") {
    ROOT_URL = "https://api.sahal.dev";
} else {
    ROOT_URL = "http://localhost:3000";
}
export const AWS_S3_USER = 'https://shams-bucket.s3.amazonaws.com'