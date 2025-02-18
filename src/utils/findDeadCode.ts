const findDeadCode = () => {
  const elements = document.querySelectorAll("*");
  const usedIds = new Set<string>();
  const usedClasses = new Set<string>();

  elements.forEach((element) => {
    if (element.id) usedIds.add(element.id);
    element.classList.forEach((cls) => usedClasses.add(cls));
  });

  console.log("🚀 Unbenutzte CSS-IDs oder Klassen im Projekt:");

  // Fehlerbehebung: `Array.from()` nutzen, da `StyleSheetList` kein `forEach()` direkt hat
  Array.from(document.styleSheets).forEach((sheet: CSSStyleSheet) => {
    try {
      Array.from(sheet.cssRules).forEach((rule: CSSRule) => {
        if ("selectorText" in rule) {
          const selectorText = (rule as CSSStyleRule).selectorText;
          selectorText.split(",").forEach((selector: string) => {
            selector = selector.trim();
            if (selector.startsWith("#") && !usedIds.has(selector.slice(1))) {
              console.warn(`❌ Nicht verwendete ID gefunden: ${selector}`);
            }
            if (
              selector.startsWith(".") &&
              !usedClasses.has(selector.slice(1))
            ) {
              console.warn(`❌ Nicht verwendete Klasse gefunden: ${selector}`);
            }
          });
        }
      });
    } catch (e) {
      console.warn("⚠ Konnte Stylesheet nicht auslesen:", e);
    }
  });
};

export default findDeadCode;
