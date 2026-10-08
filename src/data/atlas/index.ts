import type { AtlasTopic } from "./types";

export const ATLAS_TOPICS: readonly AtlasTopic[] = [
  { id: "isaiah-48-16", title: "Who is speaking?", family: "Isaiah 48:16", summary: "The identity of the sent speaker and the role of the Spirit.", x: 51, y: 22, status: "case-draft", caseSlug: "isaiah-48-16" },
  { id: "john-1-1", title: "The Word with God", family: "John 1:1", summary: "Does the Word's relationship to God require a distinct eternal person?", x: 74, y: 19, status: "mapped" },
  { id: "john-17-5", title: "Glory before the world", family: "John 17:5", summary: "How should Jesus' request for pre-world glory be understood?", x: 86, y: 39, status: "mapped" },
  { id: "baptism", title: "The baptism of Jesus", family: "Matthew 3", summary: "The Son, Spirit, and heavenly voice in one event.", x: 82, y: 65, status: "mapped" },
  { id: "matthew-28", title: "In the name", family: "Matthew 28:19", summary: "The singular name and three designations in the baptismal commission.", x: 66, y: 80, status: "mapped" },
  { id: "another-comforter", title: "Another Comforter", family: "John 14", summary: "Who is the Comforter promised by Jesus?", x: 44, y: 82, status: "mapped" },
  { id: "hebrews-1", title: "The Son addressed", family: "Hebrews 1", summary: "God's speech concerning the Son.", x: 22, y: 75, status: "mapped" },
  { id: "philippians-2", title: "The form of God", family: "Philippians 2", summary: "Preexistence, humility, and the incarnation.", x: 14, y: 51, status: "mapped" },
  { id: "genesis-1", title: "Let us make man", family: "Genesis 1:26", summary: "Plural speech alongside singular divine creation.", x: 22, y: 27, status: "mapped" },
  { id: "john-10", title: "I and my Father are one", family: "John 10:30", summary: "Unity of action, essence, or identity?", x: 40, y: 43, status: "mapped" },
  { id: "2-corinthians-13", title: "The triadic blessing", family: "2 Corinthians 13:14", summary: "What a threefold blessing demonstrates, and what it does not.", x: 62, y: 50, status: "mapped" },
  { id: "son-prays", title: "Why does Jesus pray?", family: "Luke 22", summary: "Incarnate human will and the Father-Son relationship.", x: 49, y: 62, status: "mapped" },
];

export const CASE_TOPIC = ATLAS_TOPICS.find((topic) => topic.id === "isaiah-48-16")!;
