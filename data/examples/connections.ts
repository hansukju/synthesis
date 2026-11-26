export const comparisons: Record<string, { type: string; reason: string }> = {
  "fashion-01": { type: "Utility and silhouette", reason: "The collection uses straps and padding to give protective details a visible role in the overall shape." },
  "music-01": { type: "Atmosphere and restraint", reason: "The space around the instruments offers a point of comparison for how deliberate gaps and restraint can create tension." },
  "fashion-02": { type: "Structural tension", reason: "The coat’s uneven opening shifts the focus away from its center, an example of using asymmetry to create tension." },
  "fashion-03": { type: "Utilitarian design", reason: "The storm flap and offset pockets show how practical details can give a piece its visual rhythm." },
  "fashion-04": { type: "Repetition and form", reason: "Pressed pleats create a repeating line that brings order to a loose, functional shape." },
  "fashion-05": { type: "Layering and texture", reason: "The nylon shell and translucent liner show how contrasting layers can give a spare design depth." },
  "music-02": { type: "Aesthetic similarity", reason: "Sparse percussion and sharp bursts of guitar offer a sonic comparison for restraint and abrupt changes in form." },
  "music-03": { type: "Repetition and texture", reason: "The tight drum loop and grainy samples balance a regular structure with a rough surface." },
  "music-04": { type: "Use of negative space", reason: "The pauses between guitar phrases leave the room audible, making empty space part of the arrangement." },
  "music-05": { type: "Material texture", reason: "Tape grain softens the edges of the beat, much as fabric texture can soften the outline of a garment." },
};

export const featuredConnections: Record<string, Record<string, string>> = {
  "fashion-01": {
    "fashion-03": "Compare the collection’s strap details with the jacket’s storm flap and offset pockets: both make a practical feature part of the silhouette.",
    "fashion-04": "The trousers use pressed pleats to define a loose shape, echoing how padding gives the collection’s outerwear a clearer outline.",
    "fashion-05": "The contrast between the parka’s shell and liner offers another way to look at the collection’s use of layered surfaces.",
    "music-01": "Compare the album’s spare arrangements with the collection’s restrained silhouettes. In both, a few strong elements carry much of the effect.",
    "music-02": "The sample recording’s sudden guitar accents offer a sonic parallel to the way metallic finishes interrupt the collection’s darker palette.",
    "music-03": "Grainy samples and a regular drum loop offer a sonic comparison for the collection’s contrast between rough and smooth materials.",
  },
  "music-01": {
    "fashion-01": "The collection makes individual straps and padded shapes stand out against restrained silhouettes, much as the album’s production leaves space around individual instruments.",
    "fashion-02": "The coat’s off-center fastening creates visual tension that can be compared with the album’s use of space and sharp accents.",
    "fashion-05": "The parka’s distinct shell and lining offer a visual parallel for listening to the foreground instruments and the ambience around them.",
    "music-02": "The fictional LP uses sparse percussion and short guitar bursts as a way to explore the quieter and harsher sides of post-punk.",
    "music-04": "Both entries prompt a listen for room sound and silence between phrases, even though the sample single imagines a different recording approach.",
    "music-05": "The fictional tape uses grain and a subdued sound to build atmosphere, a comparison with Hannett’s use of studio space and ambience.",
  },
};
