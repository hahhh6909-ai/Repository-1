
async function twilioRequest(resource, params) {
  if (!config.sid || !config.token) {
      throw new Error(
            "Kredensial Twilio belum diatur di .env."
                );
                  }

                    if (!config.allowed.length) {
                        throw new Error(
                              "Daftar penerima berizin ALLOWED_TO masih kosong."
                                  );
                                    }

                                      const endpoint =
                                          `https://api.twilio.com/2010-04-01/Accounts/` +
                                              `${config.sid}/${resource}.json`;

                                                const auth = Buffer.from(
                                                    `${config.sid}:${config.token}`
                                                      ).toString("base64");

                                                        const response = await fetch(endpoint, {
                                                            method: "POST",
                                                                headers: {
                                                                      Authorization: `Basic ${auth}`,
                                                                            "Content-Type":
                                                                                    "application/x-www-form-urlencoded"
                                                                                        },
                                                                                            body: new URLSearchParams(params)
                                                                                              });

                                                                                                const data = await response.json().catch(() => ({}));

                                                                                                  if (!response.ok) {
                                                                                                      throw new Error(
                                                                                                            `Provider API error ${response.status}: ` +
                                                                                                                  `${data.message || "Permintaan gagal"}`
                                                                                                                      );
                                                                                                                        }

                                                                                                                          return data;
                                                                                                                          }
                                                                                                                          