import { error, redirect } from "@sveltejs/kit";
import QRCode from "qrcode";

const YOUR_APP_URL = "https://candy.redruby.one";

export const load = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, "/account/login");
  }

  const qrcodes = await locals.pocketbase.collection("qrcodes").getFullList({
    filter: `user = "${locals.user.id}"`,
    sort: "-created",
  });

  return { qrcodes };
};

export const actions = {
  create: async ({ locals, request }) => {
    if (!locals.user) {
      throw error(401, "Unauthorized");
    }

    const formData = await request.formData();
    const link = formData.get("link");

    if (!link) {
      throw error(400, "Link is required");
    }

    const shortCode = generateShortCode();
    const qrcodeBuffer = await QRCode.toBuffer(
      `${YOUR_APP_URL}/r/${shortCode}`
    );
    const qrcodeFile = new File([qrcodeBuffer], "qrcode.png", {
      type: "image/png",
    });

    try {
      await locals.pocketbase.collection("qrcodes").create({
        user: locals.user.id,
        link: link,
        qrcode: qrcodeFile,
        shortCode: shortCode,
      });
    } catch (err) {
      console.error("Error creating QR code:", err);
      throw error(500, "Failed to create QR code");
    }

    return { success: true };
  },

  update: async ({ locals, request }) => {
    if (!locals.user) {
      throw error(401, "Unauthorized");
    }

    const formData = await request.formData();
    const id = formData.get("id");
    const link = formData.get("link");

    if (!id || !link) {
      throw error(400, "ID and link are required");
    }

    try {
      await locals.pocketbase.collection("qrcodes").update(id, {
        link: link,
      });
    } catch (err) {
      console.error("Error updating QR code:", err);
      throw error(500, "Failed to update QR code");
    }

    return { success: true };
  },

  delete: async ({ locals, request }) => {
    if (!locals.user) {
      throw error(401, "Unauthorized");
    }

    const formData = await request.formData();
    const id = formData.get("id");

    if (!id) {
      throw error(400, "ID is required");
    }

    try {
      await locals.pocketbase.collection("qrcodes").delete(id);
    } catch (err) {
      console.error("Error deleting QR code:", err);
      throw error(500, "Failed to delete QR code");
    }

    return { success: true };
  },
};

function generateShortCode() {
  // Implement a function to generate a unique short code
  // This could be a random string or a hash of the current timestamp
  return Math.random().toString(36).substr(2, 6);
}
