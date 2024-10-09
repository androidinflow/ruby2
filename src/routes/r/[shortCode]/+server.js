import { error } from "@sveltejs/kit";

export async function GET({ params, locals }) {
  const { shortCode } = params;

  try {
    const qrCode = await locals.pocketbase
      .collection("qrcodes")
      .getFirstListItem(`shortCode="${shortCode}"`);

    if (qrCode) {
      console.log("QR Code found :", qrCode.link);
      // Ensure the link is a valid URL
      let redirectUrl = qrCode.link;
      if (
        !redirectUrl.startsWith("http://") &&
        !redirectUrl.startsWith("https://")
      ) {
        redirectUrl = "http://" + redirectUrl;
      }
      return new Response(null, {
        status: 302,
        headers: { Location: redirectUrl },
      });
    } else {
      throw error(404, "QR Code not found");
    }
  } catch (err) {
    console.error("Error fetching QR code:", err);
    throw error(500, "Internal Server Error");
  }
}
