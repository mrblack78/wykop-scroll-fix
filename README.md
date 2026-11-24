# Wykop – odblokuj scroll

Rozszerzenie do Opery (oraz Chrome / Edge / Brave i innych przeglądarek opartych na Chromium), które wyłącza nakładkę
„Strona nie wczytała się poprawnie :(” na wykop.pl, blokującą przewijanie strony, oraz zapobiega „zamrażaniu” aplikacji.

## Co robi

Na wykop.pl, gdy skrypt uzna, że reklama się nie wyświetliła, po ~20 s:

1. pokazuje pełnoekranową nakładkę `section.block-alert`,
2. blokuje scroll regułą `body:has(section.block-alert){overflow:hidden}`,
3. wywołuje `ensureCompatibility()`, która wyłącza reaktywność aplikacji Vue (strona przestaje się aktualizować i doładowywać treści) i wycisza konsolę.

Rozszerzenie:

- `fix.css` – ukrywa nakładkę i przywraca przewijanie,
- `fix.js` – ignoruje mutację `config/setBlockAlert` i podmienia `ensureCompatibility()` na pustą funkcję.

## Instalacja

1. Pobierz gotowy plik [**wykop-scroll-fix-v1.0.zip**](https://github.com/mrblack78/wykop-scroll-fix/releases/latest) z zakładki **Releases** i rozpakuj.
2. Otwórz `opera://extensions` (w Chrome: `chrome://extensions`).
3. Włącz **Tryb programisty**.
4. Kliknij **Załaduj rozpakowane** i wskaż rozpakowany folder.
5. Odśwież wykop.pl – w konsoli pojawi się `[wykop-scroll-fix] aktywne`.

## Uwagi

Jeśli wykop zmieni kod (nazwy `block-alert`, `setBlockAlert`, `ensureCompatibility`), rozszerzenie może wymagać aktualizacji.

## Licencja

Wtyczkę możesz dowolnie używać, kopiować, modyfikować i rozpowszechniać – także we własnych projektach.
Kod udostępniony jest na licencji [MIT](LICENSE).
