import { INITIAL_TEAM, TeamMember } from "./admin-data";
import fs from "fs";
import path from "path";

const TMP_FILE_PATH = path.join(process.cwd(), ".next", "digiset_team_cache.json");
const ALT_TMP_PATH = "/tmp/digiset_team_cache.json";

declare global {
  var digisetTeamStoreMemory: TeamMember[] | undefined;
  var digisetTeamIsUserModified: boolean | undefined;
}

function loadStore(): TeamMember[] {
  if (globalThis.digisetTeamStoreMemory && Array.isArray(globalThis.digisetTeamStoreMemory)) {
    return globalThis.digisetTeamStoreMemory;
  }

  try {
    if (fs.existsSync(TMP_FILE_PATH)) {
      const data = fs.readFileSync(TMP_FILE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        globalThis.digisetTeamStoreMemory = parsed;
        globalThis.digisetTeamIsUserModified = true;
        return parsed;
      }
    }
  } catch {
    // Ignorer
  }

  try {
    if (fs.existsSync(ALT_TMP_PATH)) {
      const data = fs.readFileSync(ALT_TMP_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        globalThis.digisetTeamStoreMemory = parsed;
        globalThis.digisetTeamIsUserModified = true;
        return parsed;
      }
    }
  } catch {
    // Ignorer
  }

  const initial = [...INITIAL_TEAM];
  globalThis.digisetTeamStoreMemory = initial;
  return initial;
}

function saveStore(items: TeamMember[]) {
  globalThis.digisetTeamStoreMemory = items;
  globalThis.digisetTeamIsUserModified = true;
  try {
    const json = JSON.stringify(items, null, 2);
    try {
      fs.writeFileSync(TMP_FILE_PATH, json, "utf-8");
    } catch {
      // Ignorer
    }
    try {
      fs.writeFileSync(ALT_TMP_PATH, json, "utf-8");
    } catch {
      // Ignorer
    }
  } catch {
    // Ignorer
  }
}

export function getGlobalTeam(): TeamMember[] {
  const current = loadStore();
  return [...current].sort((a, b) => (a.sort_order || 1) - (b.sort_order || 1));
}

export function isTeamUserModified(): boolean {
  return !!globalThis.digisetTeamIsUserModified;
}

export function addTeamMember(member: TeamMember): TeamMember {
  const current = loadStore();
  const newMember: TeamMember = {
    ...member,
    id: member.id || `team-${Date.now()}`,
    sort_order: member.sort_order || current.length + 1,
    created_at: member.created_at || new Date().toISOString(),
  };

  const updated = [...current.filter((m) => m.id !== newMember.id), newMember];
  saveStore(updated);
  return newMember;
}

export function updateTeamMember(id: string, updates: Partial<TeamMember>): TeamMember | null {
  const current = loadStore();
  let updatedMember: TeamMember | null = null;

  const updated = current.map((m) => {
    if (m.id === id) {
      updatedMember = { ...m, ...updates };
      return updatedMember;
    }
    return m;
  });

  saveStore(updated);
  return updatedMember;
}

export function deleteTeamMember(id: string): boolean {
  const current = loadStore();
  const initialLength = current.length;
  const updated = current.filter((m) => m.id !== id);
  saveStore(updated);
  return updated.length < initialLength;
}
