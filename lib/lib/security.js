import { config } from "./config.js";

const events = [];

function cleanOldEvents() {
  const cutoff = Date.now() - 60 * 60 * 1000;

    while (events.length && events[0].time < cutoff) {
        events.shift();
          }
          }

          export function normalizeNumber(input) {
            const value = input.trim();

              if (!/^\+[1-9]\d{7,14}$/.test(value)) {
                  throw new Error("Nomor harus dalam format internasional E.164.");
                    }

                      return value;
                      }

                      export function assertAllowed(input) {
                        const number = normalizeNumber(input);

                          if (!config.allowed.includes(number)) {
                              throw new Error("Nomor tidak ada di daftar penerima berizin.");
                                }

                                  return number;
                                  }

                                  export function reserveAction(number, type) {
                                    cleanOldEvents();

                                      const totalLimit = config.maxActions;
                                        const messageLimit = config.maxMessages;
                                          const callLimit = config.maxCalls;

                                            const total = events.length;
                                              const recipientEvents = events.filter(e => e.number === number);
                                                const messages = recipientEvents.filter(e => e.type === "message").length;
                                                  const calls = recipientEvents.filter(e => e.type === "call").length;

                                                    if (total >= totalLimit) {
                                                        throw new Error("Batas total tindakan per jam tercapai.");
                                                          }

                                                            if (type === "message" && messages >= messageLimit) {
                                                                throw new Error("Batas pesan per penerima per jam tercapai.");
                                                                  }

                                                                    if (type === "call" && calls >= callLimit) {
                                                                        throw new Error("Batas panggilan per penerima per jam tercapai.");
                                                                          }

                                                                            // Reserve before sending to prevent concurrent overuse.
                                                                              events.push({ time: Date.now(), number, type });
                                                                              }