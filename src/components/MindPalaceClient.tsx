"use client";

import { useEffect, useState } from "react";
import { MindPalaceRoute, MindPalaceObject, LaneSlug } from "@/types";
import { getMindPalaces, saveMindPalaces } from "@/lib/local-store";
import { LANE_LIST } from "@/data/lanes";
import { Plus, Trash2 } from "lucide-react";

export function MindPalaceClient() {
  const [routes, setRoutes] = useState<MindPalaceRoute[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [walkMode, setWalkMode] = useState(false);
  const [walkIndex, setWalkIndex] = useState(0);
  const [showBuilder, setShowBuilder] = useState(false);

  useEffect(() => {
    const r = getMindPalaces();
    setRoutes(r);
    setActiveId(r[0]?.id ?? null);
  }, []);

  const active = routes.find((r) => r.id === activeId) ?? null;

  function addRoute(route: MindPalaceRoute) {
    const next = [...routes, route];
    setRoutes(next);
    saveMindPalaces(next);
    setActiveId(route.id);
    setShowBuilder(false);
  }

  function deleteRoute(id: string) {
    const next = routes.filter((r) => r.id !== id);
    setRoutes(next);
    saveMindPalaces(next);
    if (activeId === id) setActiveId(next[0]?.id ?? null);
  }

  return (
    <div className="px-5 py-8 md:px-10 md:py-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="eyebrow mb-1">Mind Palace</p>
          <h1 className="font-display text-3xl">Your memory routes.</h1>
        </div>
        <button onClick={() => setShowBuilder(true)} className="btn-primary"><Plus size={15} /> New route</button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {routes.map((r) => (
          <button
            key={r.id}
            onClick={() => { setActiveId(r.id); setWalkMode(false); }}
            className={`text-sm px-3 py-1.5 rounded-full border ${activeId === r.id ? "bg-ink text-paper border-ink" : "border-line text-ink-soft"}`}
          >
            {r.title}
          </button>
        ))}
      </div>

      {showBuilder && <RouteBuilder onSave={addRoute} onCancel={() => setShowBuilder(false)} />}

      {active && !showBuilder && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-display text-xl">{active.roomName}</p>
              <p className="text-sm text-ink-faint">{active.debateUse}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setWalkMode(!walkMode); setWalkIndex(0); }} className="btn-secondary text-sm">
                {walkMode ? "Exit walk mode" : "Walk from memory"}
              </button>
              <button onClick={() => deleteRoute(active.id)} className="btn-secondary text-sm text-rose"><Trash2 size={14} /></button>
            </div>
          </div>

          {!walkMode ? (
            <div className="space-y-3">
              {active.objects.map((o) => (
                <ObjectCard key={o.id} object={o} />
              ))}
            </div>
          ) : (
            <WalkTest route={active} index={walkIndex} setIndex={setWalkIndex} />
          )}
        </div>
      )}
    </div>
  );
}

function ObjectCard({ object }: { object: MindPalaceObject }) {
  return (
    <div className="paper-card p-4 flex gap-4">
      <div className="w-10 h-10 rounded-full bg-gold-dim flex items-center justify-center font-mono text-sm text-gold shrink-0">
        {object.order}
      </div>
      <div>
        <p className="font-display text-base">{object.objectName} &rarr; {object.reference}</p>
        <p className="text-sm text-ink-soft italic mt-0.5">&ldquo;{object.phrase}&rdquo;</p>
        <p className="text-xs text-ink-faint mt-1">{object.function}</p>
      </div>
    </div>
  );
}

function WalkTest({ route, index, setIndex }: { route: MindPalaceRoute; index: number; setIndex: (i: number) => void }) {
  const [revealed, setRevealed] = useState(false);
  const object = route.objects[index];
  if (!object) return null;

  return (
    <div className="paper-card p-6 text-center">
      <p className="eyebrow mb-2">Object {index + 1} of {route.objects.length}</p>
      <p className="font-display text-2xl mb-4">{object.objectName}</p>
      {revealed ? (
        <div className="mb-6">
          <p className="text-lg text-slate mb-1">{object.reference}</p>
          <p className="text-sm text-ink-soft italic">&ldquo;{object.phrase}&rdquo;</p>
        </div>
      ) : (
        <p className="text-ink-faint mb-6">What verse sits here?</p>
      )}
      <div className="flex gap-2 justify-center">
        {!revealed ? (
          <button onClick={() => setRevealed(true)} className="btn-primary">Reveal</button>
        ) : (
          <button
            onClick={() => { setRevealed(false); setIndex(index + 1 < route.objects.length ? index + 1 : 0); }}
            className="btn-primary"
          >
            {index + 1 < route.objects.length ? "Next object" : "Restart route"}
          </button>
        )}
      </div>
    </div>
  );
}

function RouteBuilder({ onSave, onCancel }: { onSave: (r: MindPalaceRoute) => void; onCancel: () => void }) {
  const [title, setTitle] = useState("");
  const [roomName, setRoomName] = useState("");
  const [laneSlug, setLaneSlug] = useState<LaneSlug>(LANE_LIST[0].slug);
  const [debateUse, setDebateUse] = useState("");
  const [objects, setObjects] = useState<MindPalaceObject[]>([
    { id: crypto.randomUUID(), order: 1, objectName: "", verseId: "", reference: "", phrase: "", function: "" },
  ]);

  function updateObject(i: number, patch: Partial<MindPalaceObject>) {
    setObjects(objects.map((o, idx) => (idx === i ? { ...o, ...patch } : o)));
  }

  function addObject() {
    setObjects([...objects, { id: crypto.randomUUID(), order: objects.length + 1, objectName: "", verseId: "", reference: "", phrase: "", function: "" }]);
  }

  function save() {
    if (!title || !roomName || objects.length === 0) return;
    onSave({
      id: crypto.randomUUID(),
      title,
      laneSlug,
      roomName,
      debateUse,
      difficulty: 1,
      createdAt: new Date().toISOString(),
      lastReviewed: null,
      nextReview: null,
      objects,
    });
  }

  return (
    <div className="paper-card p-6 mb-8">
      <p className="eyebrow mb-4">Build a route</p>
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <input placeholder="Route title" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-line rounded-lg px-3 py-2 text-sm bg-surface" />
        <input placeholder="Room / location name" value={roomName} onChange={(e) => setRoomName(e.target.value)} className="border border-line rounded-lg px-3 py-2 text-sm bg-surface" />
        <select value={laneSlug} onChange={(e) => setLaneSlug(e.target.value as LaneSlug)} className="border border-line rounded-lg px-3 py-2 text-sm bg-surface">
          {LANE_LIST.map((l) => <option key={l.slug} value={l.slug}>{l.title}</option>)}
        </select>
        <input placeholder="Debate use / when to reach for this" value={debateUse} onChange={(e) => setDebateUse(e.target.value)} className="border border-line rounded-lg px-3 py-2 text-sm bg-surface" />
      </div>

      <p className="eyebrow mb-2">Objects, in order</p>
      <div className="space-y-2 mb-3">
        {objects.map((o, i) => (
          <div key={o.id} className="grid sm:grid-cols-4 gap-2">
            <input placeholder="Object (Door, Table...)" value={o.objectName} onChange={(e) => updateObject(i, { objectName: e.target.value })} className="border border-line rounded-lg px-3 py-2 text-xs bg-surface" />
            <input placeholder="Reference" value={o.reference} onChange={(e) => updateObject(i, { reference: e.target.value })} className="border border-line rounded-lg px-3 py-2 text-xs bg-surface" />
            <input placeholder="Phrase" value={o.phrase} onChange={(e) => updateObject(i, { phrase: e.target.value })} className="border border-line rounded-lg px-3 py-2 text-xs bg-surface" />
            <input placeholder="Function / notes" value={o.function} onChange={(e) => updateObject(i, { function: e.target.value })} className="border border-line rounded-lg px-3 py-2 text-xs bg-surface" />
          </div>
        ))}
      </div>
      <button onClick={addObject} className="text-xs text-slate underline underline-offset-4 mb-5">+ add object</button>

      <div className="flex gap-2">
        <button onClick={save} className="btn-primary">Save route</button>
        <button onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </div>
  );
}
