import { INITIAL_TEAM, TeamMember } from "./admin-data";
import fs from "fs";
import path from "path";

const TMP_FILE_PATH = path.join(process.cwd(), ".next", "digiset_team_cache.json");
const ALT_TMP_PATH = "/tmp/digiset_team_cache.json";

let isStoreInitialized = false;
let isUserModifiedStore = false;

function loadStore(): TeamMember[] {
  try {
    if (fs.existsSync(TMP_FILE_PATH)) {
      const data = fs.readFileSync(TMP_FILE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        isStoreInitialized = true;
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
      if (Array.isArray(parsed)) {
        isStoreInitialized = true;
        return parsed;
      }
    }
  } catch {
    // Ignorer
  }

  isStoreInitialized = true;
  return [...INITIAL_TEAM];
}

function saveStore(items: TeamMember[]) {
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

let teamStoreMemory: TeamMember[] = loadStore();

export function getGlobalTeam(): TeamMember[] {
  if (!isStoreInitialized) {
    teamStoreMemory = loadStore();
  }
  return [...teamStoreMemory].sort((a, b) => (a.sort_order || 1) - (b.sort_order || 1));
}

export function isTeamUserModified(): boolean {
  return isUserModifiedStore;
}

export function addTeamMember(member: TeamMember): TeamMember {
  if (!isStoreInitialized) {
    teamStoreMemory = loadStore();
  }
  isUserModifiedStore = true;

  const newMember: TeamMember = {
    ...member,
    id: member.id || `team-${Date.now()}`,
    sort_order: member.sort_order || teamStoreMemory.length + 1,
    created_at: member.created_at || new Date().toISOString(),
  };

  teamStoreMemory = [...teamStoreMemory.filter((m) => m.id !== newMember.id), newMember];
  saveStore(teamStoreMemory);
  return newMember;
}

export function updateTeamMember(id: string, updates: Partial<TeamMember>): TeamMember | null {
  if (!isStoreInitialized) {
    teamStoreMemory = loadStore();
  }
  isUserModifiedStore = true;

  let updatedMember: TeamMember | null = null;

  teamStoreMemory = teamStoreMemory.map((m) => {
    if (m.id === id) {
      updatedMember = { ...m, ...updates };
      return updatedMember;
    }
    return m;
  });

  saveStore(teamStoreMemory);
  return updatedMember;
}

export function deleteTeamMember(id: string): boolean {
  if (!isStoreInitialized) {
    teamStoreMemory = loadStore();
  }
  isUserModifiedStore = true;

  const initialLength = teamStoreMemory.length;
  teamStoreMemory = teamStoreMemory.filter((m) => m.id !== id);
  saveStore(teamStoreMemory);
  return teamStoreMemory.length < initialLength;
}
