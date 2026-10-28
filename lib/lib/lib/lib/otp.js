import { randomInt, createHash, timingSafeEqual } from "node:crypto";
import { config } from "./config.js";

const sessions = new Map();
const MAX_ATTEMPTS = 5;

export function createOtp(sessionId) {
  const id = String(sessionId).trim();

    if (!/^[a-zA-Z0-9_-]{1,64}$/.test(id)) {
        throw new Error("ID sesi tidak valid.");
          }

            const code = String(randomInt(0, 1_000_000)).padStart(6, "0");

              sessions.set(id, {
                  hash: createHash("sha256").update(code).digest(),
                      expiresAt: Date.now() + config.otpTtl * 1000,
                          attempts: 0
                            });

                              return {
                                  code,
                                      expiresInSeconds: config.otpTtl
                                        };
                                        }

                                        export function verifyOtp(sessionId, input) {
                                          const id = String(sessionId).trim();
                                            const session = sessions.get(id);

                                              if (!session) {
                                                  return { valid: false, reason: "Sesi tidak ditemukan." };
                                                    }

                                                      if (Date.now() > session.expiresAt) {
                                                          sessions.delete(id);
                                                              return { valid: false, reason: "OTP kedaluwarsa." };
                                                                }

                                                                  if (session.attempts >= MAX_ATTEMPTS) {
                                                                      sessions.delete(id);
                                                                          return { valid: false, reason: "Batas percobaan tercapai." };
                                                                            }

                                                                              session.attempts++;

                                                                                const candidate = createHash("sha256")
                                                                                    .update(String(input).trim())
                                                                                        .digest();

                                                                                          const valid = timingSafeEqual(session.hash, candidate);

                                                                                            if (valid) {
                                                                                                sessions.delete(id);
                                                                                                    return { valid: true, reason: "OTP valid." };
                                                                                                      }

                                                                                                        if (session.attempts >= MAX_ATTEMPTS) {
                                                                                                            sessions.delete(id);
                                                                                                                return { valid: false, reason: "Batas percobaan tercapai." };
                                                                                                                  }

                                                                                                                    return {
                                                                                                                        valid: false,
                                                                                                                            reason: `Kode salah. Sisa percobaan: ${MAX_ATTEMPTS - session.attempts}.`
                                                                                                                              };
                                                                                                                              }