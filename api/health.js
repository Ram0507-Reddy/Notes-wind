export default function handler(request, response) {
    response.status(200).json({ status: 'Ok', message: 'API is working' });
}
