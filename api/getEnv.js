export default function handler(req, res) {
    res.status(200).json({
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
    });
}
