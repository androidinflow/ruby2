import { error } from "@sveltejs/kit";

export async function GET({ params, locals }) {
  const { shortCode } = params;

  try {
    const qrCode = await locals.pocketbase
      .collection("qrcodes")
      .getFirstListItem(`shortCode="${shortCode}"`);

    if (!qrCode) {
      throw error(404, "QR Code not found");
    }

    let redirectUrl = qrCode.link;
    if (!redirectUrl.startsWith("http")) {
      redirectUrl = "http://" + redirectUrl;
    }

    return new Response(null, {
      status: 302,
      headers: { Location: redirectUrl },
    });
  } catch (err) {
    console.error("Error:", err);
    throw error(500, "Internal Server Error");
  }
}
