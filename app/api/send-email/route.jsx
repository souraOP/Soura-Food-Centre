import Email from "@/emails";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)
export async function POST(req) {

    const response = await req.json();
    try {
        const data = await resend.emails.send({
            from: 'SouraFoodCentre@soura.systeme.io',
            to: [response.email],
            subject: 'Soura Food Centre Order Confirmation',
            react: Email(),
        });
        return NextResponse.json({data})
    } catch(error) {
        return NextResponse.json({error})
    }
}