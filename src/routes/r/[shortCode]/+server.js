import { error } from "@sveltejs/kit";

export async function GET({ params, locals }) {
  const { shortCode } = params;

  try {
    const qrCode = await locals.pocketbase
      .collection("qrcodes")
      .getFirstListItem(`shortCode="${shortCode}"`);

    if (qrCode) {
      console.log("QR Code found :", qrCode.link);
      return new Response(null, {
        status: 302,
        headers: { Location: qrCode.link },
      });
    } else {
      throw error(404, "QR Code not found");
    }
  } catch (err) {
    console.error("Error fetching QR code:", err);
    throw error(500, "Internal Server Error");
  }
}
