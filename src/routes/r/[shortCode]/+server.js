import { error, redirect } from "@sveltejs/kit";

export async function GET({ params, locals }) {
  const { shortCode } = params;

  try {
    const qrCode = await locals.pocketbase
      .collection("qrcodes")
      .getFirstListItem(`shortCode="${shortCode}"`);

    if (!qrCode) {
      throw error(404, "QR Code not found");
    }

    const redirectUrl =
      qrCode.link.startsWith("http://") || qrCode.link.startsWith("https://")
        ? qrCode.link
        : `http://${qrCode.link}`;

    throw redirect(302, redirectUrl);
  } catch (err) {
    console.error("Error fetching QR code:", err);
    throw error(500, "Internal Server Error");
  }
}
