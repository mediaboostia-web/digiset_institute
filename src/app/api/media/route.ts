import { NextResponse } from "next/server";
import { getGlobalMedia, addMediaItem, deleteMediaItem } from "@/lib/media-store";

export async function GET() {
  try {
    const media = getGlobalMedia();
    return NextResponse.json({ ok: true, data: media });
  } catch (error) {
    console.error("[api/media GET]", error);
    return NextResponse.json({ ok: false, error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.url || !body.title) {
      return NextResponse.json({ ok: false, error: "Titre et URL obligatoires" }, { status: 400 });
    }

    const newItem = addMediaItem({
      title: body.title,
      url: body.url,
      category: body.category || "Uploads",
      size: body.size || "Base64 / Local",
      dimensions: body.dimensions || "Variable",
    });

    return NextResponse.json({ ok: true, data: newItem });
  } catch (error) {
    console.error("[api/media POST]", error);
    return NextResponse.json({ ok: false, error: "Erreur création média" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ ok: false, error: "ID manquant" }, { status: 400 });
    }

    const success = deleteMediaItem(id);
    return NextResponse.json({ ok: success });
  } catch (error) {
    console.error("[api/media DELETE]", error);
    return NextResponse.json({ ok: false, error: "Erreur suppression média" }, { status: 500 });
  }
}
