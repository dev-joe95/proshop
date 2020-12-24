export default function (err, req, res, next) {
    const statusbar = res.statusCode === 200 ? res.statusCode : 500;
    res.status(statusbar);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
}
