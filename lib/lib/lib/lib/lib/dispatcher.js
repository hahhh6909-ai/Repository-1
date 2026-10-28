import { sendSms, sendWhatsApp } from "./providers.js";

export async function dispatchLink(channel, number, url) {
  let parsed;

    try {
        parsed = new URL(url);
          } catch {
              throw new Error("URL tidak valid.");
                }

                  if (
                      parsed.protocol !== "https:" ||
                          parsed.username ||
                              parsed.password
                                ) {
                                    throw new Error("Gunakan tautan HTTPS yang aman.");
                                      }

                                        const message = `Tautan yang diminta: ${parsed.href}`;

                                          if (channel === "sms") {
                                              return sendSms(number, message);
                                                }

                                                  if (channel === "whatsapp") {
                                                      return sendWhatsApp(number, message);
                                                        }

                                                          throw new Error("Pilih channel sms atau whatsapp.");
                                                          }