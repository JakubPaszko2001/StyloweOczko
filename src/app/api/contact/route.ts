import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { imie, nazwisko, telefon, email, usluga, data, godzina, uwagi } =
    await req.json();

  await resend.emails.send({
    from: "StyloweOczko <onboarding@resend.dev>",
    to: "kontakt@styloweoczko.pl",
    reply_to: email,
    subject: `Nowa rezerwacja – ${usluga}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;color:#1E120D">
        <h2 style="color:#C4876A;margin-bottom:4px">Nowa rezerwacja</h2>
        <p style="color:#9B7B6A;margin-top:0;font-size:13px">Stylowe Oczko – formularz ze strony</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:16px">
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e8e0;color:#9B7B6A;width:120px">Imię i nazwisko</td><td style="padding:8px 0;border-bottom:1px solid #f0e8e0"><strong>${imie} ${nazwisko}</strong></td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e8e0;color:#9B7B6A">Telefon</td><td style="padding:8px 0;border-bottom:1px solid #f0e8e0">${telefon}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e8e0;color:#9B7B6A">E-mail</td><td style="padding:8px 0;border-bottom:1px solid #f0e8e0">${email}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e8e0;color:#9B7B6A">Usługa</td><td style="padding:8px 0;border-bottom:1px solid #f0e8e0">${usluga}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e8e0;color:#9B7B6A">Data</td><td style="padding:8px 0;border-bottom:1px solid #f0e8e0">${data}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e8e0;color:#9B7B6A">Godzina</td><td style="padding:8px 0;border-bottom:1px solid #f0e8e0">${godzina}</td></tr>
          ${uwagi ? `<tr><td style="padding:8px 0;color:#9B7B6A;vertical-align:top">Uwagi</td><td style="padding:8px 0">${uwagi}</td></tr>` : ""}
        </table>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
