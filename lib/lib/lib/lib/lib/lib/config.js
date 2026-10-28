
import "dotenv/config";

function numberList(value = "") {
  return value
      .split(",")
          .map((item) => item.trim())
              .filter(Boolean);
              }

              export const config = {
                sid: process.env.TWILIO_ACCOUNT_SID || "",
                  token: process.env.TWILIO_AUTH_TOKEN || "",
                    smsFrom: process.env.TWILIO_SMS_FROM || "",
                      waFrom: process.env.TWILIO_WHATSAPP_FROM || "",
                        allowed: numberList(process.env.ALLOWED_TO),
                          maxMessages: Number(process.env.MAX_MESSAGES_PER_HOUR || 3),
                            maxCalls: Number(process.env.MAX_CALLS_PER_HOUR || 1),
                              maxActions: Number(process.env.MAX_TOTAL_ACTIONS_PER_HOUR || 10),
                                voiceMessage:
                                    process.env.VOICE_MESSAGE ||
                                        "Authorized test notification.",
                                          otpTtl: Number(process.env.OTP_TTL_SECONDS || 300)
                                          };

                                          export function validateConfig() {
                                            if (
                                                !Number.isInteger(config.maxMessages) ||
                                                    config.maxMessages < 1 ||
                                                        !Number.isInteger(config.maxCalls) ||
                                                            config.maxCalls < 0 ||
                                                                !Number.isInteger(config.maxActions) ||
                                                                    config.maxActions < 1 ||
                                                                        !Number.isInteger(config.otpTtl) ||
                                                                            config.otpTtl < 30
                                                                              ) {
                                                                                  throw new Error(
                                                                                        "Nilai batas penggunaan atau masa OTP tidak valid."
                                                                                            );
                                                                                              }
                                                                                              }
                                                                                              