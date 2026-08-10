"use client";

import { AlertTriangle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  itemName?: string;
}

export function ConfirmDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmer la suppression",
  description = "Cette action est définitive et ne pourra pas être annulée. Êtes-vous sûr de vouloir supprimer cet élément ?",
  itemName,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md w-[94vw] p-6 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
        <DialogHeader className="space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <DialogTitle className="text-center font-heading text-lg font-bold text-slate-900">
            {title}
          </DialogTitle>
          {itemName && (
            <div className="text-center text-xs font-semibold text-slate-800 bg-slate-100 p-3 rounded-lg border border-slate-200 break-words whitespace-normal leading-snug max-w-full">
              {itemName}
            </div>
          )}
          <DialogDescription className="text-center text-xs text-slate-600 leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 w-full">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full text-xs font-semibold text-slate-700 border-slate-300 hover:bg-slate-50 py-2.5 h-auto"
          >
            Annuler
          </Button>
          <Button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full text-xs font-bold bg-red-600 hover:bg-red-700 text-white gap-1.5 shadow-sm py-2.5 h-auto whitespace-normal"
          >
            <Trash2 className="h-4 w-4 shrink-0" />
            Confirmer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
