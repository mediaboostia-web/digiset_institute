"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Loader2, CheckCircle2, AlertCircle, Save, ImageIcon, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { MediaPickerModal } from "@/components/admin/media-picker-modal";
import { PAGE_CONTENT_DEFS, type ContentBlockDef } from "@/lib/content-defaults";
import type { ContentBlock } from "@/app/api/content-blocks/route";

export default function AdminPagesContentPage() {
  const [selectedPageKey, setSelectedPageKey] = useState(PAGE_CONTENT_DEFS[0].pageKey);
  const [values, setValues] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [mediaPickerFor, setMediaPickerFor] = useState<string | null>(null);

  const pageDef = PAGE_CONTENT_DEFS.find((def) => def.pageKey === selectedPageKey)!;

  const sections = useMemo(() => {
    const order: string[] = [];
    const grouped = new Map<string, ContentBlockDef[]>();
    for (const block of pageDef.blocks) {
      if (!grouped.has(block.section)) {
        grouped.set(block.section, []);
        order.push(block.section);
      }
      grouped.get(block.section)!.push(block);
    }
    return order.map((section) => ({ section, blocks: grouped.get(section)! }));
  }, [pageDef]);

  const loadPage = useCallback(async (pageKey: string) => {
    setIsLoading(true);
    setSaveError(null);
    setSaveSuccess(false);

    const def = PAGE_CONTENT_DEFS.find((d) => d.pageKey === pageKey)!;
    const defaults: Record<string, string> = {};
    for (const block of def.blocks) defaults[block.key] = block.defaultValue;

    try {
      const res = await fetch(`/api/content-blocks?page_key=${pageKey}`);
      const json = await res.json();
      if (json.ok && Array.isArray(json.data)) {
        for (const block of json.data as ContentBlock[]) {
          if (block.value) defaults[block.block_key] = block.value;
        }
      }
    } catch {
      // Repli silencieux sur les valeurs par défaut codées en dur.
    }

    setValues(defaults);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadPage(selectedPageKey);
  }, [selectedPageKey, loadPage]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const blocks = pageDef.blocks.map((block) => ({
        block_key: block.key,
        content_type: block.type === "image_url" ? "image_url" : "text",
        value: values[block.key] ?? block.defaultValue,
      }));

      const res = await fetch("/api/content-blocks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page_key: selectedPageKey, blocks }),
      });
      const json = await res.json();

      if (!json.ok) {
        if (res.status === 403) {
          throw new Error("Réservé aux Super-Administrateurs — contactez la Direction pour modifier ce contenu.");
        }
        throw new Error(json.error || "Erreur d'enregistrement.");
      }
      setSaveSuccess(true);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Erreur de connexion.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderField = (block: ContentBlockDef) => {
    const value = values[block.key] ?? block.defaultValue;

    if (block.type === "image_url") {
      return (
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            {value ? (
              <Image src={value} alt={block.label} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-300">
                <ImageIcon className="h-5 w-5" />
              </div>
            )}
          </div>
          <div className="flex-1 space-y-1.5">
            <p className="truncate text-[11px] text-gray-500">{value}</p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setMediaPickerFor(block.key)}
              className="text-xs"
            >
              Choisir une image
            </Button>
          </div>
        </div>
      );
    }

    if (block.type === "textarea") {
      return (
        <Textarea
          value={value}
          onChange={(e) => setValues((prev) => ({ ...prev, [block.key]: e.target.value }))}
          rows={3}
          className="text-xs"
        />
      );
    }

    return (
      <Input
        value={value}
        onChange={(e) => setValues((prev) => ({ ...prev, [block.key]: e.target.value }))}
        className="text-xs"
      />
    );
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-gray-900">Contenu des Pages Publiques</h1>
        <p className="text-xs text-gray-500 mt-1">
          Modifiez les textes et images clés du site public. Un champ laissé vide affiche le contenu par défaut.
        </p>
        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-amber-700">
          <ShieldAlert className="h-3.5 w-3.5" />
          <span>Enregistrement réservé aux comptes Super-Administrateur.</span>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
        {PAGE_CONTENT_DEFS.map((def) => (
          <button
            key={def.pageKey}
            type="button"
            onClick={() => setSelectedPageKey(def.pageKey)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-bold whitespace-nowrap border transition-colors cursor-pointer ${
              selectedPageKey === def.pageKey
                ? "bg-brand-blue-dark text-white border-brand-blue-dark shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900"
            }`}
          >
            {def.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-5 shadow-xs">
          {saveError && (
            <div className="flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-medium text-red-800">
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
              <span>{saveError}</span>
            </div>
          )}
          {saveSuccess && (
            <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-medium text-emerald-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Contenu enregistré — visible immédiatement sur le site public.</span>
            </div>
          )}

          <Accordion multiple defaultValue={[sections[0]?.section]} className="space-y-2">
            {sections.map(({ section, blocks }) => (
              <AccordionItem
                key={section}
                value={section}
                className="rounded-xl border border-gray-200 px-4 not-last:border-b-0"
              >
                <AccordionTrigger className="text-xs sm:text-sm font-bold text-gray-800 hover:no-underline">
                  {section}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-1">
                    {blocks.map((block) => (
                      <div key={block.key}>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">{block.label}</label>
                        {renderField(block)}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="pt-2 flex justify-end">
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Enregistrer
            </Button>
          </div>
        </div>
      )}

      <MediaPickerModal
        isOpen={mediaPickerFor !== null}
        onClose={() => setMediaPickerFor(null)}
        onSelectMedia={(url) => {
          if (mediaPickerFor) {
            setValues((prev) => ({ ...prev, [mediaPickerFor]: url }));
          }
          setMediaPickerFor(null);
        }}
        currentSelectedUrl={mediaPickerFor ? values[mediaPickerFor] : ""}
      />
    </div>
  );
}
