const STRUCTURE_DETAILS = {
  "fixed-array": {
    name: "Fixed-size array",
    familyLabel: "Arrays / Sequences",
    familyHref: "../structures.html#arrays",
    summary:
      "Najprostsza sekwencja o stałym rozmiarze i ciągłej pamięci. Daje bardzo szybki dostęp po indeksie, ale nie rośnie sama z siebie.",
    mainIdea:
      "Elementy leżą obok siebie w pamięci, więc odczyt i zapis pod indeksem są bardzo tanie.",
    useWhen: [
      "gdy rozmiar znasz z góry",
      "gdy zależy Ci na prostocie i przewidywalnym układzie pamięci",
      "gdy chcesz maksymalnie wykorzystać cache locality",
    ],
    watchFor: [
      "rozmiar jest stały",
      "wstawianie w środek zwykle kosztuje O(n)",
      "duże kopie mogą być kosztowne",
    ],
    operations: "access O(1), update O(1), scan O(n), insert middle O(n)",
    aliases:
      "C: <code>T arr[N]</code>, C++: <code>std::array</code> lub zwykła tablica, C#: <code>T[]</code>, Java: <code>T[]</code>",
    commonUse: "bufory o znanym rozmiarze, małe statyczne zestawy danych, tablice lokalne",
    notes: "To nadal bardzo ważny fundament, nawet jeśli w praktyce częściej pracujesz na dynamic array.",
    complexity: { href: "../complexities/o1.html", label: "Zobacz O(1)" },
    related: [
      {
        title: "Na mapie",
        text: 'Wróć do <a class="inline-link" href="../structures.html#arrays"><code>Arrays / Sequences</code></a>.',
      },
      {
        title: "Bliska alternatywa",
        text: 'Jeśli rozmiar ma rosnąć, częściej wybierasz <a class="inline-link" href="dynamic-array.html">dynamic array</a>.',
      },
      {
        title: "Najważniejsza przewaga",
        text: "Bardzo prosty model pamięci i szybki dostęp po indeksie.",
      },
    ],
  },
  "dynamic-array": {
    name: "Dynamic array",
    familyLabel: "Arrays / Sequences",
    familyHref: "../structures.html#arrays",
    summary:
      "Rosnąca tablica z ciągłą pamięcią. To ogólny koncept stojący za C++ <code>vector</code>, C# <code>List&lt;T&gt;</code>, Javowym <code>ArrayList</code> i pythonową <code>list</code>.",
    mainIdea:
      "Trzymasz elementy jak w tablicy, ale od czasu do czasu bufor się powiększa i dane są kopiowane do większej tablicy.",
    useWhen: [
      "gdy potrzebujesz szybkiego dostępu po indeksie",
      "gdy dane dopisujesz głównie na końcu",
      "gdy chcesz dobrego kompromisu między prostotą i wydajnością praktyczną",
    ],
    watchFor: [
      "wstawianie na początku lub w środku zwykle kosztuje O(n)",
      "powiększanie bufora jest okazjonalnie drogie",
      "append ma koszt amortized O(1), a nie twarde O(1) w każdej operacji",
    ],
    operations: "access O(1), append amortized O(1), insert middle O(n), scan O(n)",
    aliases:
      "C++: <code>vector</code>, C#: <code>List&lt;T&gt;</code>, Java: <code>ArrayList</code>, Python: <code>list</code>",
    commonUse: "domyślna sekwencja w CP, tablice robocze, sortowanie, prefix sums, grafy przez listy sąsiedztwa",
    notes: "To bardzo często najlepszy punkt startowy przy projektowaniu rozwiązania.",
    complexity: { href: "../complexities/amortized.html", label: "Zobacz amortized O(1)" },
    related: [
      {
        title: "Na mapie",
        text: 'Wróć do <a class="inline-link" href="../structures.html#arrays"><code>Arrays / Sequences</code></a>.',
      },
      {
        title: "Bliska alternatywa",
        text: 'Jeśli potrzebujesz szybkiego <code>push_front</code>, spójrz na <a class="inline-link" href="deque.html">deque</a>.',
      },
      {
        title: "Powiązana złożoność",
        text: 'Najważniejszy koszt to <a class="inline-link" href="../complexities/amortized.html">amortized O(1)</a> dla append.',
      },
    ],
  },
  deque: {
    name: "Deque",
    familyLabel: "Arrays / Sequences",
    familyHref: "../structures.html#arrays",
    summary:
      "Double-ended queue, czyli sekwencja z szybkim dokładaniem z obu końców. Ma random access O(1), ale zwykle nie jest przechowywana jako jeden ciągły blok pamięci.",
    mainIdea:
      "Łączy wygodę indeksowania jak tablica z tanimi operacjami na początku i końcu.",
    useWhen: [
      "gdy potrzebujesz <code>push_front</code> i <code>push_back</code>",
      "gdy nadal chcesz mieć dostęp po indeksie",
      "gdy chcesz coś pomiędzy dynamic array a linked listą",
    ],
    watchFor: [
      "cache locality bywa gorsze niż w dynamic array",
      "to nie jest linked lista",
      "w praktyce często przegrywa z dynamic array, jeśli nie używasz obu końców",
    ],
    operations: "access O(1), push_front O(1), push_back O(1), insert middle O(n)",
    aliases:
      "C++: <code>deque</code>, Python: <code>collections.deque</code>, Java: <code>ArrayDeque</code>",
    commonUse: "monotonic queue, BFS, sliding window, operacje na obu końcach",
    notes: "Sama nazwa <code>deque</code> jest już dość ogólna i funkcjonuje w wielu językach.",
    complexity: { href: "../complexities/o1.html", label: "Zobacz O(1)" },
    related: [
      {
        title: "Na mapie",
        text: 'To nadal część <a class="inline-link" href="../structures.html#arrays"><code>Arrays / Sequences</code></a>.',
      },
      {
        title: "Bliska alternatywa",
        text: 'Jeśli nie potrzebujesz obu końców, prostszy bywa <a class="inline-link" href="dynamic-array.html">dynamic array</a>.',
      },
      {
        title: "Najczęstsze nieporozumienie",
        text: "Deque nie jest linked listą i nadal daje dostęp po indeksie O(1).",
      },
    ],
  },
  "doubly-linked-list": {
    name: "Doubly linked list",
    familyLabel: "Arrays / Sequences",
    familyHref: "../structures.html#arrays",
    summary:
      "Dwukierunkowa linked lista. Każdy węzeł zna poprzedni i następny, więc łatwo usuwać lub wstawiać elementy przy już znalezionym miejscu.",
    mainIdea:
      "Płacisz wskaźnikami i gorszą lokalnością pamięci, ale zyskujesz bardzo tanie lokalne operacje na węzłach.",
    useWhen: [
      "gdy naprawdę operujesz na iteratorach lub referencjach do węzłów",
      "gdy częste są lokalne insert/erase",
      "gdy nie potrzebujesz random access",
    ],
    watchFor: [
      "dostęp po pozycji to O(n)",
      "cache locality jest słaba",
      "w CP zwykle rzadziej wygrywa z dynamic array niż początkującym się wydaje",
    ],
    operations: "access O(n), insert/erase przy znanym węźle O(1), scan O(n)",
    aliases:
      "C++: <code>list</code>, C#: <code>LinkedList&lt;T&gt;</code>, Java: <code>LinkedList</code>",
    commonUse: "lokalne operacje na elementach, LRU cache, niektóre struktury pomocnicze",
    notes: "Teoretyczna złożoność wygląda dobrze, ale w praktyce często przegrywa z prostszymi strukturami przez wskaźniki i cache.",
    complexity: { href: "../complexities/on.html", label: "Zobacz O(n)" },
    related: [
      {
        title: "Na mapie",
        text: 'To jeden z leafów w <a class="inline-link" href="../structures.html#arrays"><code>Arrays / Sequences</code></a>.',
      },
      {
        title: "Bliska alternatywa",
        text: 'Jeśli chcesz prostszej wersji, zobacz <a class="inline-link" href="singly-linked-list.html">singly linked list</a>.',
      },
      {
        title: "Praktyczny kontrast",
        text: 'Jeśli zależy Ci na wydajności w CP, częściej wygrywa <a class="inline-link" href="dynamic-array.html">dynamic array</a>.',
      },
    ],
  },
  "singly-linked-list": {
    name: "Singly linked list",
    familyLabel: "Arrays / Sequences",
    familyHref: "../structures.html#arrays",
    summary:
      "Jednokierunkowa linked lista. Każdy węzeł zna tylko następny element, więc struktura jest prostsza i lżejsza niż wersja dwukierunkowa.",
    mainIdea:
      "Minimalna linked lista: idziesz tylko do przodu i nie masz taniego cofania.",
    useWhen: [
      "gdy chcesz bardzo prostą listę jednokierunkową",
      "gdy operacje dotyczą głównie początku listy",
      "gdy zależy Ci na prostszej strukturze niż doubly linked list",
    ],
    watchFor: [
      "dostęp po pozycji nadal jest O(n)",
      "usuwanie elementu wymaga zwykle znać poprzednik",
      "w CP pojawia się rzadko",
    ],
    operations: "access O(n), push_front O(1), scan O(n)",
    aliases:
      "C++: <code>forward_list</code>, w innych językach zwykle własna implementacja",
    commonUse: "edukacyjne przykłady, lekkie kolejki jednokierunkowe, bardzo proste struktury pomocnicze",
    notes: "To bardziej narzędzie do zrozumienia linked list niż codzienny bohater zadań konkursowych.",
    complexity: { href: "../complexities/on.html", label: "Zobacz O(n)" },
    related: [
      {
        title: "Na mapie",
        text: 'To wciąż <a class="inline-link" href="../structures.html#arrays"><code>Arrays / Sequences</code></a>.',
      },
      {
        title: "Bliska alternatywa",
        text: 'Jeśli potrzebujesz cofania lub łatwiejszego usuwania, zobacz <a class="inline-link" href="doubly-linked-list.html">doubly linked list</a>.',
      },
      {
        title: "Praktyczny kontrast",
        text: 'Dla random access i cache locality i tak częściej wybierasz <a class="inline-link" href="dynamic-array.html">dynamic array</a>.',
      },
    ],
  },
  "hash-map": {
    name: "Hash map",
    familyLabel: "Hash-based",
    familyHref: "../structures.html#hash-based",
    summary:
      "Mapowanie klucz -&gt; wartość przez hash table. To ogólny koncept stojący za C++ <code>unordered_map</code>, C# <code>Dictionary&lt;TKey, TValue&gt;</code> i pythonowym <code>dict</code>.",
    mainIdea:
      "Klucz jest haszowany do bucketu, więc przy dobrym rozrzucie danych lookup bywa średnio bardzo szybki.",
    useWhen: [
      "gdy potrzebujesz szybkiego wyszukiwania po kluczu",
      "gdy liczysz częstości, memoizujesz albo robisz lookupy po id",
      "gdy porządek kluczy nie jest potrzebny",
    ],
    watchFor: [
      "brak uporządkowania iteracji",
      "kolizje mogą pogorszyć wydajność",
      "w CP czasem trzeba dodać custom hash przeciw hackom",
    ],
    operations: "lookup / insert / erase średnio O(1), w pesymistycznym przypadku O(n)",
    aliases:
      "C++: <code>unordered_map</code>, C#: <code>Dictionary&lt;TKey, TValue&gt;</code>, Python: <code>dict</code>, Java: <code>HashMap</code>",
    commonUse: "counting frequencies, memoization, mapowania klucz -> wartość, szybkie lookupy",
    notes: "Jeśli potrzebujesz porządku kluczy lub twardej gwarancji O(log n), częściej patrzysz na ordered map opartą o RB-tree.",
    complexity: { href: "../complexities/o1.html", label: "Zobacz O(1)" },
    related: [
      {
        title: "Na mapie",
        text: 'Wróć do sekcji <a class="inline-link" href="../structures.html#hash-based"><code>Hash-based</code></a>.',
      },
      {
        title: "Bliska alternatywa",
        text: 'Jeśli interesuje Cię tylko istnienie elementu, zobacz <a class="inline-link" href="hash-set.html">hash set</a>.',
      },
      {
        title: "Powiązana złożoność",
        text: 'Najczęściej kojarzy się ze średnim <a class="inline-link" href="../complexities/o1.html"><code>O(1)</code></a>.',
      },
    ],
  },
  "hash-set": {
    name: "Hash set",
    familyLabel: "Hash-based",
    familyHref: "../structures.html#hash-based",
    summary:
      "Zbiór oparty o hash table. Zamiast mapować klucz na wartość, interesuje Cię głównie to, czy element istnieje.",
    mainIdea:
      "To uproszczona wersja hash mapy: trzymasz same klucze, bez dodatkowych wartości.",
    useWhen: [
      "gdy chcesz sprawdzać membership test",
      "gdy usuwasz duplikaty",
      "gdy porządek danych nie ma znaczenia",
    ],
    watchFor: [
      "brak porządku iteracji",
      "kolizje nadal mogą pogorszyć wydajność",
      "zachowuje się inaczej niż ordered set oparty o drzewo",
    ],
    operations: "lookup / insert / erase średnio O(1), w pesymistycznym przypadku O(n)",
    aliases:
      "C++: <code>unordered_set</code>, C#: <code>HashSet&lt;T&gt;</code>, Python: <code>set</code>, Java: <code>HashSet</code>",
    commonUse: "deduplikacja, visited set, szybkie pytania o istnienie elementu",
    notes: "Jeśli potrzebujesz danych w kolejności, hash set nie jest odpowiedzią.",
    complexity: { href: "../complexities/o1.html", label: "Zobacz O(1)" },
    related: [
      {
        title: "Na mapie",
        text: 'To drugi podstawowy leaf w rodzinie <a class="inline-link" href="../structures.html#hash-based"><code>Hash-based</code></a>.',
      },
      {
        title: "Bliska alternatywa",
        text: 'Jeśli potrzebujesz trzymać wartości przy kluczu, przejdź do <a class="inline-link" href="hash-map.html">hash map</a>.',
      },
      {
        title: "Powiązana złożoność",
        text: 'Najczęściej kojarzy się ze średnim <a class="inline-link" href="../complexities/o1.html"><code>O(1)</code></a>.',
      },
    ],
  },
  "rb-tree": {
    name: "RB-tree",
    familyLabel: "Trees / BST family",
    familyHref: "../structures.html#bst-family",
    summary:
      "Red-Black Tree to zbalansowane drzewo BST. Nie pilnuje idealnej równowagi, ale daje mocną gwarancję O(log n) dla podstawowych operacji.",
    mainIdea:
      "Kolory i rotacje pilnują, by wysokość drzewa nie uciekła za daleko.",
    useWhen: [
      "gdy potrzebujesz uporządkowanych danych",
      "gdy chcesz mieć stabilne O(log n)",
      "gdy interesuje Cię lower_bound, upper_bound i iteracja w kolejności",
    ],
    watchFor: [
      "zwykle wolniejszy praktycznie niż hash map przy samym lookupie",
      "implementacja ręczna jest bardziej złożona niż zwykły BST",
      "cache locality bywa słabsze niż w strukturach tablicowych",
    ],
    operations: "find / insert / erase O(log n)",
    aliases:
      "C++: zwykle pod spodem <code>map</code> i <code>set</code>, Java: <code>TreeMap</code> i <code>TreeSet</code>",
    commonUse: "ordered map, ordered set, zakresy po kluczach, predecessor/successor",
    notes: "To jeden z najważniejszych praktycznych przedstawicieli balanced BST.",
    complexity: { href: "../complexities/ologn.html", label: "Zobacz O(log n)" },
    related: [
      {
        title: "Na mapie",
        text: 'To leaf rodziny <a class="inline-link" href="../structures.html#bst-family"><code>BST family</code></a>.',
      },
      {
        title: "Bliska alternatywa",
        text: 'Jeśli nie potrzebujesz porządku, często szybszy praktycznie będzie <a class="inline-link" href="hash-map.html">hash map</a>.',
      },
      {
        title: "Powiązana złożoność",
        text: 'Najbardziej charakterystyczne jest tu <a class="inline-link" href="../complexities/ologn.html"><code>O(log n)</code></a>.',
      },
    ],
  },
  "avl-tree": {
    name: "AVL tree",
    familyLabel: "Trees / BST family",
    familyHref: "../structures.html#bst-family",
    summary:
      "AVL tree to balanced BST, które mocniej pilnuje wysokości niż RB-tree. Dzięki temu wyszukiwanie bywa bardziej regularne, ale rotacji jest zwykle więcej.",
    mainIdea:
      "Każdy węzeł kontroluje różnicę wysokości lewego i prawego poddrzewa.",
    useWhen: [
      "gdy chcesz balanced BST z mocną kontrolą wysokości",
      "gdy bardziej zależy Ci na lookupie niż na minimalizacji rotacji",
      "gdy uczysz się różnych stylów balansowania BST",
    ],
    watchFor: [
      "więcej rotacji niż w RB-tree",
      "w bibliotekach standardowych pojawia się rzadziej niż RB-tree",
      "ręczna implementacja jest dość techniczna",
    ],
    operations: "find / insert / erase O(log n)",
    aliases: "Najczęściej własna implementacja edukacyjna lub akademicka",
    commonUse: "zadania edukacyjne, porównanie strategii balansowania BST",
    notes: "AVL to dobry punkt odniesienia do zrozumienia, czym w praktyce różni się balansowanie drzew.",
    complexity: { href: "../complexities/ologn.html", label: "Zobacz O(log n)" },
    related: [
      { title: "Na mapie", text: 'To jeden z wariantów w <a class="inline-link" href="../structures.html#bst-family"><code>BST family</code></a>.' },
      { title: "Bliska alternatywa", text: 'W bibliotekach standardowych częściej spotykasz <a class="inline-link" href="rb-tree.html">RB-tree</a>.' },
      { title: "Powiązana złożoność", text: 'Podstawowe operacje nadal siedzą w <a class="inline-link" href="../complexities/ologn.html"><code>O(log n)</code></a>.' },
    ],
  },
  treap: {
    name: "Treap",
    familyLabel: "Trees / BST family",
    familyHref: "../structures.html#bst-family",
    summary:
      "Treap łączy porządek BST z losowym priorytetem heapa. Daje oczekiwane O(log n), jeśli priorytety są rozłożone losowo.",
    mainIdea:
      "Jeden porządek pilnuje kluczy, a drugi priorytetów, więc rotacje balansują drzewo w sposób probabilistyczny.",
    useWhen: [
      "gdy chcesz prostszy kod niż w części klasycznych balansowanych BST",
      "gdy akceptujesz oczekiwaną, a nie absolutną gwarancję",
      "gdy uczysz się randomized data structures",
    ],
    watchFor: [
      "gwarancja jest oczekiwana, nie najgorszego przypadku",
      "wynik zależy od jakości losowania",
      "w bibliotekach standardowych zwykle go nie dostajesz gotowego",
    ],
    operations: "expected find / insert / erase O(log n)",
    aliases: "Najczęściej własna implementacja w C++, Pythonie albo Javie",
    commonUse: "ordered set/map w zadaniach, split/merge w implementacjach contestowych",
    notes: "Treap bywa lubiany w CP, bo split i merge naturalnie wpisują się w jego konstrukcję.",
    complexity: { href: "../complexities/ologn.html", label: "Zobacz O(log n)" },
    related: [
      { title: "Na mapie", text: 'To randomized wariant w <a class="inline-link" href="../structures.html#bst-family"><code>BST family</code></a>.' },
      { title: "Bliska alternatywa", text: 'Jeśli chcesz deterministyczne balansowanie, spójrz na <a class="inline-link" href="rb-tree.html">RB-tree</a> albo <a class="inline-link" href="avl-tree.html">AVL tree</a>.' },
      { title: "Powiązana złożoność", text: 'Typowo mówimy tu o oczekiwanym <a class="inline-link" href="../complexities/ologn.html"><code>O(log n)</code></a>.' },
    ],
  },
  "splay-tree": {
    name: "Splay tree",
    familyLabel: "Trees / BST family",
    familyHref: "../structures.html#bst-family",
    summary:
      "Splay tree to self-adjusting BST. Często używane elementy przesuwają się bliżej korzenia przez operację splay.",
    mainIdea:
      "Nie balansujesz drzewa sztywno jak w AVL czy RB-tree, tylko przebudowujesz je lokalnie po dostępie.",
    useWhen: [
      "gdy interesuje Cię amortized, a nie worst-case per operation",
      "gdy pewne elementy mogą być używane znacznie częściej niż inne",
      "gdy chcesz poznać inną filozofię balansowania BST",
    ],
    watchFor: [
      "pojedyncza operacja może być droga",
      "najważniejsza gwarancja jest amortized",
      "w praktycznych bibliotekach standardowych spotkasz go rzadko",
    ],
    operations: "amortized find / insert / erase O(log n)",
    aliases: "Najczęściej własna implementacja edukacyjna",
    commonUse: "zadania teoretyczne, eksperymenty z self-adjusting trees",
    notes: "To ciekawy kontrast wobec drzew, które pilnują równowagi jawnie po każdej modyfikacji.",
    complexity: { href: "../complexities/ologn.html", label: "Zobacz O(log n)" },
    related: [
      { title: "Na mapie", text: 'To kolejny leaf w <a class="inline-link" href="../structures.html#bst-family"><code>BST family</code></a>.' },
      { title: "Bliska alternatywa", text: 'Jeśli chcesz stabilniejsze per-operation zachowanie, zwykle wybierasz <a class="inline-link" href="rb-tree.html">RB-tree</a>.' },
      { title: "Powiązana złożoność", text: 'Najważniejsza intuicja to amortized <a class="inline-link" href="../complexities/ologn.html"><code>O(log n)</code></a>.' },
    ],
  },
  "b-tree": {
    name: "B-tree",
    familyLabel: "Trees / B-tree family",
    familyHref: "../structures.html#b-tree-family",
    summary:
      "B-tree to wielodrogowe drzewo zaprojektowane pod pamięć masową i pracę blokową. Bardziej kojarzy się z bazami danych i indeksami niż z klasycznym CP.",
    mainIdea:
      "Jeden węzeł trzyma wiele kluczy i dzieci, co zmniejsza liczbę odwołań do pamięci zewnętrznej.",
    useWhen: [
      "gdy myślisz o indeksach w bazach danych",
      "gdy chcesz zrozumieć drzewa pod storage, a nie tylko pod RAM",
      "gdy czytasz o systemach plików i silnikach DB",
    ],
    watchFor: [
      "to nie jest typowa struktura do codziennego CP",
      "implementacja jest inna niż klasyczne BST",
      "najważniejszy kontekst to pamięć zewnętrzna i bloki",
    ],
    operations: "search / insert / erase O(log n)",
    aliases: "Najczęściej ukryta pod indeksami baz danych i storage engines",
    commonUse: "primary indexes, storage engines, systemy plików",
    notes: "Jeśli interesuje Cię świat DB, ta rodzina jest ważniejsza niż większość contestowych drzew BST.",
    complexity: { href: "../complexities/ologn.html", label: "Zobacz O(log n)" },
    related: [
      { title: "Na mapie", text: 'To leaf w <a class="inline-link" href="../structures.html#b-tree-family"><code>B-tree family</code></a>.' },
      { title: "Bliska alternatywa", text: 'W praktyce storage bardzo często spotkasz też <a class="inline-link" href="b-plus-tree.html">B+ tree</a>.' },
      { title: "Praktyczny kontekst", text: "To bardziej świat baz danych niż typowych zadań konkursowych." },
    ],
  },
  "b-plus-tree": {
    name: "B+ tree",
    familyLabel: "Trees / B-tree family",
    familyHref: "../structures.html#b-tree-family",
    summary:
      "B+ tree to wariant B-tree, w którym dane zwykle lądują w liściach, a liście są połączone sekwencyjnie. Dzięki temu bardzo dobrze nadaje się do zakresów i iteracji po kluczach.",
    mainIdea:
      "Węzły wewnętrzne prowadzą po indeksie, a liście przechowują właściwe rekordy lub odwołania do nich.",
    useWhen: [
      "gdy potrzebujesz indeksu storage-friendly",
      "gdy ważne są range scans",
      "gdy chcesz zrozumieć typowe indeksowanie w relacyjnych bazach danych",
    ],
    watchFor: [
      "to nadal nie jest typowa struktura CP",
      "najwięcej sensu ma w kontekście bloków i storage",
      "różni się od B-tree tym, gdzie kończą dane i jak działają liście",
    ],
    operations: "search / insert / erase O(log n), dobre range scans",
    aliases: "Typowy indeks w wielu systemach DB",
    commonUse: "relacyjne bazy danych, indeksy po kluczu głównym, zakresowe zapytania po indeksie",
    notes: "Jeśli widzisz wzmiankę o indeksie w DB, bardzo często właśnie o ten wariant chodzi.",
    complexity: { href: "../complexities/ologn.html", label: "Zobacz O(log n)" },
    related: [
      { title: "Na mapie", text: 'To drugi najważniejszy leaf w <a class="inline-link" href="../structures.html#b-tree-family"><code>B-tree family</code></a>.' },
      { title: "Bliska alternatywa", text: 'Dla ogólniejszego wariantu spójrz na <a class="inline-link" href="b-tree.html">B-tree</a>.' },
      { title: "Praktyczny kontekst", text: "Świetnie łączy szybki lookup z wygodnym przechodzeniem po zakresach." },
    ],
  },
  "segment-tree": {
    name: "Segment tree",
    familyLabel: "Trees / CP trees",
    familyHref: "../structures.html#cp-trees",
    summary:
      "Segment tree jest budowane pod zapytania i aktualizacje na przedziałach. To jedna z najważniejszych struktur stricte konkursowych.",
    mainIdea:
      "Każdy węzeł odpowiada za fragment tablicy, więc zakres rozbijasz na logarytmiczną liczbę odcinków.",
    useWhen: [
      "gdy masz range query + point update",
      "gdy potrzebujesz minimum, maksimum, sumy lub podobnego operatora na przedziałach",
      "gdy Fenwick tree jest zbyt wąskie do Twojej operacji",
    ],
    watchFor: [
      "implementacja jest dłuższa niż dla Fenwick tree",
      "łatwo pomylić indeksowanie i rozmiary tablicy drzewa",
      "bywa zbyt ciężkie do prostych zadań",
    ],
    operations: "range query O(log n), point update O(log n), build O(n)",
    aliases: "Najczęściej własna implementacja contestowa",
    commonUse: "sumy/minima/maksima na przedziałach, lazy propagation, zapytania offline/online",
    notes: "To bardzo mocna struktura, ale najpierw warto sprawdzić, czy prostsze narzędzie nie wystarczy.",
    complexity: { href: "../complexities/ologn.html", label: "Zobacz O(log n)" },
    related: [
      { title: "Na mapie", text: 'To klasyczny leaf w <a class="inline-link" href="../structures.html#cp-trees"><code>CP trees</code></a>.' },
      { title: "Bliska alternatywa", text: 'Jeśli potrzebujesz tylko prefiksów i prostszych aktualizacji, spójrz na <a class="inline-link" href="fenwick-tree.html">Fenwick tree</a>.' },
      { title: "Powiązana złożoność", text: 'Najczęściej chodzi tu o <a class="inline-link" href="../complexities/ologn.html"><code>O(log n)</code></a> na query i update.' },
    ],
  },
  "fenwick-tree": {
    name: "Fenwick tree",
    familyLabel: "Trees / CP trees",
    familyHref: "../structures.html#cp-trees",
    summary:
      "Fenwick tree, znane też jako Binary Indexed Tree, jest lżejszą strukturą do sum prefiksowych i wybranych aktualizacji.",
    mainIdea:
      "Korzysta z bitowych własności indeksu, by agregować dane po prefiksach bez budowania pełnego segment tree.",
    useWhen: [
      "gdy potrzebujesz prefiksów lub punktowych aktualizacji",
      "gdy chcesz prostszej i lżejszej alternatywy dla segment tree",
      "gdy zależy Ci na zwięzłej implementacji",
    ],
    watchFor: [
      "jest mniej ogólne niż segment tree",
      "często używa 1-based indexing, co łatwo pomylić",
      "nie każdą operację zakresową wyrazi równie naturalnie",
    ],
    operations: "prefix query O(log n), point update O(log n), build zwykle O(n log n) lub O(n)",
    aliases: "Binary Indexed Tree, BIT",
    commonUse: "sumy prefiksowe, inwersje, coordinate compression + queries",
    notes: "To jedna z tych struktur, które wyglądają magicznie, dopóki nie zrozumiesz roli najmłodszego ustawionego bitu.",
    complexity: { href: "../complexities/ologn.html", label: "Zobacz O(log n)" },
    related: [
      { title: "Na mapie", text: 'To prostszy leaf w <a class="inline-link" href="../structures.html#cp-trees"><code>CP trees</code></a>.' },
      { title: "Bliska alternatywa", text: 'Dla bardziej ogólnych operacji i zakresów częściej wybierasz <a class="inline-link" href="segment-tree.html">segment tree</a>.' },
      { title: "Powiązana złożoność", text: 'Najważniejsze operacje zwykle siedzą w <a class="inline-link" href="../complexities/ologn.html"><code>O(log n)</code></a>.' },
    ],
  },
  trie: {
    name: "Trie",
    familyLabel: "Trees / CP trees",
    familyHref: "../structures.html#cp-trees",
    summary:
      "Trie to drzewo prefiksowe, szczególnie dobre dla stringów, słowników i problemów prefiksowych.",
    mainIdea:
      "Każda krawędź odpowiada kolejnemu znakowi, więc wspólne prefiksy są współdzielone przez wiele słów.",
    useWhen: [
      "gdy pytania dotyczą prefiksów",
      "gdy przechowujesz wiele stringów lub słów",
      "gdy chcesz szybko sprawdzać, czy prefiks istnieje",
    ],
    watchFor: [
      "koszt zależy bardziej od długości słowa niż od liczby wpisów",
      "zużycie pamięci może być spore",
      "dla prostych zadań hash map lub sortowanie może wystarczyć",
    ],
    operations: "insert / search O(m), gdzie m to długość klucza",
    aliases: "prefix tree",
    commonUse: "autouzupełnianie, słowniki, prefiksy, XOR trie, zadania stringowe",
    notes: "Trie nie patrzy na porządek kluczy jak BST, tylko na strukturę samych słów.",
    related: [
      { title: "Na mapie", text: 'To jeden z najbardziej charakterystycznych leafów w <a class="inline-link" href="../structures.html#cp-trees"><code>CP trees</code></a>.' },
      { title: "Bliska alternatywa", text: 'Dla zwykłego membership test bez prefiksów częściej wystarczy <a class="inline-link" href="hash-set.html">hash set</a>.' },
      { title: "Kluczowa intuicja", text: "Koszt zależy tu przede wszystkim od długości klucza, a nie tylko od liczby elementów." },
    ],
  },
  "priority-queue": {
    name: "Priority queue",
    familyLabel: "Heaps",
    familyHref: "../structures.html#heaps",
    summary:
      "Priority queue daje szybki dostęp do elementu o najwyższym albo najniższym priorytecie. Najczęściej stoi za tym binary heap.",
    mainIdea:
      "Nie utrzymujesz pełnego porządku wszystkich elementów, tylko pilnujesz, by top był zawsze łatwo dostępny.",
    useWhen: [
      "gdy wielokrotnie pobierasz minimum lub maksimum",
      "gdy rozwiązujesz Dijkstrę, merge k lists, top-k problems",
      "gdy pełne sortowanie byłoby niepotrzebne",
    ],
    watchFor: [
      "losowy dostęp do środka struktury nie jest celem priority queue",
      "zmiana klucza w miejscu bywa niewygodna",
      "w Pythonie standardowo dostajesz min-heap, nie max-heap",
    ],
    operations: "top O(1), push O(log n), pop O(log n)",
    aliases:
      "C++: <code>priority_queue</code>, Java: <code>PriorityQueue</code>, Python: <code>heapq</code>",
    commonUse: "Dijkstra, top-k, merge struktur posortowanych, scheduling",
    notes: "To jedna z najpraktyczniejszych struktur z rodziny heapów.",
    complexity: { href: "../complexities/ologn.html", label: "Zobacz O(log n)" },
    related: [
      { title: "Na mapie", text: 'To podstawowy leaf rodziny <a class="inline-link" href="../structures.html#heaps"><code>Heaps</code></a>.' },
      { title: "Bliska alternatywa", text: 'Jeśli potrzebujesz pełnego porządku, kolejka priorytetowa nie zastąpi ordered set/map.' },
      { title: "Powiązana złożoność", text: 'Najczęściej patrzysz tu na <a class="inline-link" href="../complexities/ologn.html"><code>O(log n)</code></a> dla push/pop.' },
    ],
  },
  "adjacency-list": {
    name: "Adjacency list",
    familyLabel: "Graph-based",
    familyHref: "../structures.html#graph-based",
    summary:
      "Lista sąsiedztwa to najczęstsza reprezentacja grafu w praktyce. Dla każdego wierzchołka trzymasz listę jego sąsiadów.",
    mainIdea:
      "Płacisz tylko za istniejące krawędzie, więc reprezentacja skaluje się dobrze dla rzadkich grafów.",
    useWhen: [
      "gdy graf jest rzadki lub średnio gęsty",
      "gdy chcesz wygodnie iterować po sąsiadach",
      "gdy rozwiązujesz BFS, DFS, Dijkstrę albo topological sort",
    ],
    watchFor: [
      "sprawdzenie, czy dowolna krawędź istnieje, nie jest stałe bez dodatkowych struktur",
      "łatwo pomylić graf skierowany i nieskierowany przy dodawaniu krawędzi",
      "dla bardzo gęstych grafów może być mniej wygodne niż macierz",
    ],
    operations: "iteracja po sąsiadach O(deg(v)), pamięć O(V + E)",
    aliases:
      "C++: często <code>vector&lt;vector&lt;int&gt;&gt;</code>, C#: <code>List&lt;int&gt;[]</code>, Python: lista list",
    commonUse: "BFS, DFS, shortest paths, SCC, drzewa i ogólne grafy",
    notes: "To bardziej reprezentacja niż pojedynczy kontener z jednym API.",
    related: [
      { title: "Na mapie", text: 'To podstawowa reprezentacja w sekcji <a class="inline-link" href="../structures.html#graph-based"><code>Graph-based</code></a>.' },
      { title: "Bliska alternatywa", text: 'Dla bardzo gęstych grafów lub O(1) edge check zobacz <a class="inline-link" href="adjacency-matrix.html">adjacency matrix</a>.' },
      { title: "Praktyczny use-case", text: "To najczęstszy wybór w zadaniach konkursowych z grafów." },
    ],
  },
  "adjacency-matrix": {
    name: "Adjacency matrix",
    familyLabel: "Graph-based",
    familyHref: "../structures.html#graph-based",
    summary:
      "Macierz sąsiedztwa reprezentuje graf jako tabelę V x V. Bardzo prosta koncepcyjnie, ale kosztowna pamięciowo dla dużych grafów.",
    mainIdea:
      "Komórka [u][v] mówi od razu, czy krawędź istnieje, więc membership jest bardzo szybkie.",
    useWhen: [
      "gdy graf jest mały",
      "gdy zależy Ci na prostym O(1) edge check",
      "gdy graf jest gęsty albo reprezentacja ma być maksymalnie prosta",
    ],
    watchFor: [
      "pamięć O(V^2) potrafi szybko zabić rozwiązanie",
      "iteracja po sąsiadach jest droższa niż w adjacency list",
      "dla rzadkich grafów zwykle marnujesz miejsce",
    ],
    operations: "edge check O(1), pamięć O(V^2), iteracja po sąsiadach O(V)",
    aliases: "Tablica 2D / matrix representation",
    commonUse: "małe grafy, Floyd-Warshall, gęste grafy, proste modele relacji",
    notes: "Macierz sąsiedztwa jest często świetna dydaktycznie, ale nie zawsze praktyczna pamięciowo.",
    complexity: { href: "../complexities/o1.html", label: "Zobacz O(1)" },
    related: [
      { title: "Na mapie", text: 'To druga klasyczna reprezentacja w sekcji <a class="inline-link" href="../structures.html#graph-based"><code>Graph-based</code></a>.' },
      { title: "Bliska alternatywa", text: 'W większości zadań konkursowych częściej wygrywa <a class="inline-link" href="adjacency-list.html">adjacency list</a>.' },
      { title: "Powiązana złożoność", text: 'Najbardziej charakterystyczna cecha to <a class="inline-link" href="../complexities/o1.html"><code>O(1)</code></a> dla edge check.' },
    ],
  },
  "union-find": {
    name: "Union-Find / DSU",
    familyLabel: "Specialized",
    familyHref: "../structures.html#specialized",
    summary:
      "Union-Find, znane też jako DSU, zarządza rozłącznymi zbiorami i odpowiada na pytania, czy dwa elementy należą do tego samego komponentu.",
    mainIdea:
      "Każdy element ma reprezentanta zbioru, a union i find łączą zbiory oraz szukają ich korzeni.",
    useWhen: [
      "gdy łączysz komponenty",
      "gdy pytasz o spójność lub to, czy dwa elementy są już połączone",
      "gdy robisz Kruskala albo dynamiczne łączenie zbiorów",
    ],
    watchFor: [
      "to nie jest struktura do dowolnych zapytań na grafie",
      "największa moc bierze się z path compression i union by rank/size",
      "trzeba uważać na indeksowanie i inicjalizację parentów",
    ],
    operations: "find i union prawie stałe, zwykle opisywane jako amortized O(1)",
    aliases: "DSU, Disjoint Set Union, Union-Find",
    commonUse: "Kruskal, connected components, offline connectivity, grupowanie",
    notes: "To jedna z najbardziej eleganckich struktur specialized: prosta idea, bardzo mocna praktyka.",
    complexity: { href: "../complexities/amortized.html", label: "Zobacz amortized O(1)" },
    related: [
      { title: "Na mapie", text: 'To kluczowy leaf sekcji <a class="inline-link" href="../structures.html#specialized"><code>Specialized</code></a>.' },
      { title: "Bliska alternatywa", text: "Jeśli potrzebujesz pełnych traversali albo shortest paths, to już bardziej świat reprezentacji grafowych niż DSU." },
      { title: "Powiązana złożoność", text: 'Najczęściej opisuje się go przez <a class="inline-link" href="../complexities/amortized.html">amortized O(1)</a>.' },
    ],
  },
};

const LANGUAGE_LABELS = {
  c: "C",
  cpp: "C++",
  csharp: "C#",
  python: "Python",
};

const DECLARATION_SNIPPETS = {
  "fixed-array": {
    c: {
      meta: "Stała tablica w standardowym C",
      code: `int values[5] = {1, 2, 3, 4, 5};`,
    },
    cpp: {
      meta: "Bezpieczniejsza wersja ze standardowej biblioteki",
      code: `std::array<int, 5> values = {1, 2, 3, 4, 5};`,
    },
    csharp: {
      meta: "Tablica o stałym rozmiarze w C#",
      code: `int[] values = { 1, 2, 3, 4, 5 };`,
    },
    python: {
      meta: "Najbliżej fixed-size bywa tuple",
      code: `values = (1, 2, 3, 4, 5)`,
    },
  },
  "dynamic-array": {
    c: {
      meta: "W C zwykle zaczynasz od własnego bufora na stercie",
      code: `int* values = malloc(8 * sizeof(int));`,
    },
    cpp: {
      meta: "Najczęstszy praktyczny odpowiednik",
      code: `std::vector<int> values = {1, 2, 3};`,
    },
    csharp: {
      meta: "Dynamic array za nazwą List<T>",
      code: `List<int> values = new() { 1, 2, 3 };`,
    },
    python: {
      meta: "Pythonowa lista działa tu jak dynamic array",
      code: `values = [1, 2, 3]`,
    },
  },
  deque: {
    c: {
      meta: "W C najczęściej piszesz własny ring buffer",
      code: `/* zwykle własny ring buffer */`,
    },
    cpp: {
      meta: "Gotowy deque w standardowej bibliotece",
      code: `std::deque<int> values = {1, 2, 3};`,
    },
    csharp: {
      meta: "W standardowej bibliotece nie ma klasycznego deque",
      code: `// brak deque w standardowej bibliotece`,
    },
    python: {
      meta: "Najbliższy odpowiednik w standardowej bibliotece",
      code: `from collections import deque
values = deque([1, 2, 3])`,
    },
  },
  "doubly-linked-list": {
    c: {
      meta: "Klasyczny początek własnej implementacji",
      code: `typedef struct Node {
    int value;
    struct Node* prev;
    struct Node* next;
} Node;

Node* head = NULL;`,
    },
    cpp: {
      meta: "Gotowy kontener dwukierunkowej listy",
      code: `std::list<int> values = {1, 2, 3};`,
    },
    csharp: {
      meta: "Standardowy odpowiednik w .NET",
      code: `LinkedList<int> values = new(new[] { 1, 2, 3 });`,
    },
    python: {
      meta: "Python nie ma klasycznej doubly linked list w standardzie",
      code: `head = None  # brak doubly linked list w standardzie`,
    },
  },
  "singly-linked-list": {
    c: {
      meta: "Minimalna lista jednokierunkowa",
      code: `typedef struct Node {
    int value;
    struct Node* next;
} Node;

Node* head = NULL;`,
    },
    cpp: {
      meta: "Najbliższy gotowy odpowiednik",
      code: `std::forward_list<int> values = {1, 2, 3};`,
    },
    csharp: {
      meta: "W .NET nie ma singly linked list w standardowej bibliotece",
      code: `// brak singly linked list w standardowej bibliotece`,
    },
    python: {
      meta: "Python nie ma singly linked list w standardzie",
      code: `head = None  # brak singly linked list w standardzie`,
    },
  },
  "hash-map": {
    c: {
      meta: "Standard C nie daje gotowej hash mapy",
      code: `/* brak hash mapy w standardzie C */`,
    },
    cpp: {
      meta: "Najczęstsza wersja w C++",
      code: `std::unordered_map<std::string, int> freq;`,
    },
    csharp: {
      meta: "Praktyczny odpowiednik w .NET",
      code: `Dictionary<string, int> freq = new();`,
    },
    python: {
      meta: "Pythonowy słownik to hash map",
      code: `freq = {"ala": 2, "kot": 1}`,
    },
  },
  "hash-set": {
    c: {
      meta: "Standard C nie ma gotowego hash setu",
      code: `/* brak hash setu w standardzie C */`,
    },
    cpp: {
      meta: "Najczęstsza wersja w C++",
      code: `std::unordered_set<int> seen = {1, 2, 3};`,
    },
    csharp: {
      meta: "Standardowy odpowiednik w .NET",
      code: `HashSet<int> seen = new() { 1, 2, 3 };`,
    },
    python: {
      meta: "Wbudowany zbiór haszowany",
      code: `seen = {1, 2, 3}`,
    },
  },
  "rb-tree": {
    c: {
      meta: "W C zwykle własna implementacja albo biblioteka zewnętrzna",
      code: `/* zwykle własna implementacja balanced BST */`,
    },
    cpp: {
      meta: "Praktyczny proxy: ordered map oparta zwykle o RB-tree",
      code: `std::map<int, int> tree;`,
    },
    csharp: {
      meta: "Najbliższy praktyczny odpowiednik w .NET",
      code: `SortedDictionary<int, int> tree = new();`,
    },
    python: {
      meta: "Python nie ma RB-tree w standardowej bibliotece",
      code: `# brak RB-tree w standardzie`,
    },
  },
  "avl-tree": {
    c: {
      meta: "Punkt startowy własnej implementacji",
      code: `AVLNode* root = NULL;`,
    },
    cpp: {
      meta: "AVL zwykle implementujesz samodzielnie",
      code: `AVLNode* root = nullptr;`,
    },
    csharp: {
      meta: "Typowy start własnej implementacji",
      code: `AvlNode? root = null;`,
    },
    python: {
      meta: "Najczęściej własna klasa węzła i korzeń",
      code: `root = None`,
    },
  },
  treap: {
    c: {
      meta: "Treap zwykle implementujesz samodzielnie",
      code: `TreapNode* root = NULL;`,
    },
    cpp: {
      meta: "Typowy start implementacji treapa",
      code: `TreapNode* root = nullptr;`,
    },
    csharp: {
      meta: "Najczęściej własna klasa węzła",
      code: `TreapNode? root = null;`,
    },
    python: {
      meta: "W Pythonie zwykle własna implementacja",
      code: `root = None`,
    },
  },
  "splay-tree": {
    c: {
      meta: "Splay tree zwykle piszesz samodzielnie",
      code: `SplayNode* root = NULL;`,
    },
    cpp: {
      meta: "Typowy start implementacji splay tree",
      code: `SplayNode* root = nullptr;`,
    },
    csharp: {
      meta: "Najczęściej własna klasa węzła",
      code: `SplayNode? root = null;`,
    },
    python: {
      meta: "W Pythonie zwykle własna implementacja",
      code: `root = None`,
    },
  },
  "b-tree": {
    c: {
      meta: "B-tree zwykle implementujesz samodzielnie",
      code: `BTreeNode* root = NULL;`,
    },
    cpp: {
      meta: "Najczęściej własny typ węzła albo cała klasa",
      code: `BTreeNode* root = nullptr;`,
    },
    csharp: {
      meta: "Typowy punkt startowy własnej implementacji",
      code: `BTreeNode? root = null;`,
    },
    python: {
      meta: "W Pythonie zwykle własna implementacja",
      code: `root = None`,
    },
  },
  "b-plus-tree": {
    c: {
      meta: "B+ tree zwykle implementujesz samodzielnie",
      code: `BPlusNode* root = NULL;`,
    },
    cpp: {
      meta: "Najczęściej własny typ węzła albo cała klasa",
      code: `BPlusNode* root = nullptr;`,
    },
    csharp: {
      meta: "Typowy punkt startowy własnej implementacji",
      code: `BPlusNode? root = null;`,
    },
    python: {
      meta: "W Pythonie zwykle własna implementacja",
      code: `root = None`,
    },
  },
  "segment-tree": {
    c: {
      meta: "Klasyczna tablicowa implementacja segment tree",
      code: `int tree[4 * MAXN] = {0};`,
    },
    cpp: {
      meta: "Najczęstszy zapis w zadaniach CP",
      code: `std::vector<int> tree(4 * n, 0);`,
    },
    csharp: {
      meta: "Segment tree jako tablica",
      code: `int[] tree = new int[4 * n];`,
    },
    python: {
      meta: "Segment tree jako lista",
      code: `tree = [0] * (4 * n)`,
    },
  },
  "fenwick-tree": {
    c: {
      meta: "Fenwick tree zwykle trzymasz w 1-based array",
      code: `int bit[MAXN + 1] = {0};`,
    },
    cpp: {
      meta: "Najczęstszy zapis w CP",
      code: `std::vector<int> bit(n + 1, 0);`,
    },
    csharp: {
      meta: "Fenwick tree jako zwykła tablica",
      code: `int[] bit = new int[n + 1];`,
    },
    python: {
      meta: "Fenwick tree jako lista 1-based",
      code: `bit = [0] * (n + 1)`,
    },
  },
  trie: {
    c: {
      meta: "Częsty punkt startowy własnej implementacji",
      code: `TrieNode root = {0};`,
    },
    cpp: {
      meta: "W C++ zwykle własny typ węzła",
      code: `TrieNode root;`,
    },
    csharp: {
      meta: "Najczęściej własna klasa węzła",
      code: `TrieNode root = new();`,
    },
    python: {
      meta: "Praktyczna wersja słownikowa",
      code: `trie = {}`,
    },
  },
  "priority-queue": {
    c: {
      meta: "W C najczęściej własny binary heap",
      code: `/* zwykle własny binary heap */`,
    },
    cpp: {
      meta: "Standardowa kolejka priorytetowa",
      code: `std::priority_queue<int> pq;`,
    },
    csharp: {
      meta: "Gotowa kolejka priorytetowa w .NET",
      code: `PriorityQueue<int, int> pq = new();`,
    },
    python: {
      meta: "Heap oparty o moduł heapq",
      code: `heap = []`,
    },
  },
  "adjacency-list": {
    c: {
      meta: "W C zwykle tablice plus własne krawędzie",
      code: `int head[MAXN];
Edge edges[MAXM];`,
    },
    cpp: {
      meta: "Najczęstszy zapis w zadaniach z grafów",
      code: `std::vector<std::vector<int>> graph(n);`,
    },
    csharp: {
      meta: "Lista list w .NET",
      code: `List<int>[] graph = new List<int>[n];`,
    },
    python: {
      meta: "Lista list w Pythonie",
      code: `graph = [[] for _ in range(n)]`,
    },
  },
  "adjacency-matrix": {
    c: {
      meta: "Macierz jako tablica 2D",
      code: `int graph[N][N] = {0};`,
    },
    cpp: {
      meta: "Macierz jako zagnieżdżony vector",
      code: `std::vector<std::vector<int>> graph(n, std::vector<int>(n, 0));`,
    },
    csharp: {
      meta: "Dwuwymiarowa tablica w .NET",
      code: `int[,] graph = new int[n, n];`,
    },
    python: {
      meta: "Lista list o rozmiarze n x n",
      code: `graph = [[0] * n for _ in range(n)]`,
    },
  },
  "union-find": {
    c: {
      meta: "Klasyczny start tablic parent i size",
      code: `int parent[MAXN], size[MAXN];`,
    },
    cpp: {
      meta: "Najczęstszy zapis w zadaniach CP",
      code: `std::vector<int> parent(n), size(n, 1);`,
    },
    csharp: {
      meta: "Dwie tablice wystarczą na start",
      code: `int[] parent = new int[n], size = new int[n];`,
    },
    python: {
      meta: "Typowy start listowy",
      code: `parent = list(range(n))
size = [1] * n`,
    },
  },
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderLanguageDemo(detailKey, detail) {
  const snippets = DECLARATION_SNIPPETS[detailKey];

  if (!snippets) {
    return "";
  }

  const buttons = Object.entries(LANGUAGE_LABELS)
    .map(
      ([lang, label]) =>
        `<button class="lang-button" type="button" data-lang="${lang}">${label}</button>`,
    )
    .join("");

  const panels = Object.entries(LANGUAGE_LABELS)
    .map(([lang]) => {
      const snippet = snippets[lang];

      if (!snippet) {
        return "";
      }

      return `
        <section class="lang-panel" data-lang-panel="${lang}" hidden>
          <div class="code-meta">${snippet.meta}</div>
          <div class="code-shell">
            <pre><code>${escapeHtml(snippet.code)}</code></pre>
          </div>
        </section>
      `;
    })
    .join("");

  return `
    <section class="panel">
      <div class="tag gold">Przykład deklaracji</div>
      <h2 class="mt-14">Jak to wygląda w językach</h2>
      <p class="section-intro">
        To jest najkrótszy startowy zapis tej struktury. Jeśli standardowa biblioteka nie ma
        gotowego odpowiednika, pokazujemy typowy punkt wyjścia do własnej implementacji.
      </p>
      <div class="lang-demo mt-18" data-default="cpp">
        <div class="lang-toolbar" role="tablist" aria-label="Języki dla ${detail.name}">
          <span class="lang-toolbar-title">Pokaż deklarację dla:</span>
          ${buttons}
        </div>
        ${panels}
      </div>
    </section>
  `;
}

function initLanguageDemos(scope = document) {
  const demos = scope.querySelectorAll(".lang-demo");

  demos.forEach((demo) => {
    const buttons = Array.from(demo.querySelectorAll(".lang-button"));
    const panels = Array.from(demo.querySelectorAll(".lang-panel"));
    const defaultLang = demo.dataset.default || (buttons[0] && buttons[0].dataset.lang);

    const activate = (lang) => {
      buttons.forEach((button) => {
        const isActive = button.dataset.lang === lang;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      panels.forEach((panel) => {
        panel.hidden = panel.dataset.langPanel !== lang;
      });
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => activate(button.dataset.lang));
    });

    if (defaultLang) {
      activate(defaultLang);
    }
  });
}

function renderList(items) {
  return `<ul class="bullet-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function renderProperties(detail) {
  const rows = [
    ["Rodzina", `<code>${detail.familyLabel}</code>`],
    ["Główna idea", detail.mainIdea],
    ["Typowe koszty", detail.operations],
    ["Przykładowe nazwy", detail.aliases],
    ["Typowy use-case", detail.commonUse],
    ["Uwagi", detail.notes],
  ];

  return rows
    .map(
      ([label, value]) => `
        <tr>
          <td>${label}</td>
          <td>${value}</td>
        </tr>
      `,
    )
    .join("");
}

function renderRelated(detail) {
  return detail.related
    .map(
      (item) => `
        <article class="card">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `,
    )
    .join("");
}

function renderPage(detail, detailKey) {
  const root = document.getElementById("structure-detail-root");
  document.title = `${detail.name} - Struktury Danych`;

  root.innerHTML = `
    <div class="page">
      <header class="site-header">
        <div class="brand">Algorytms</div>
        <nav class="site-nav" aria-label="Nawigacja główna">
          <a href="../index.html">Start</a>
          <a class="active" href="../structures.html">Struktury danych</a>
          <a href="../complexities.html">Złożoności</a>
          <a href="../index-copy.html">Poprzednia wersja</a>
        </nav>
      </header>

      <section class="hero hero-detail">
        <div class="eyebrow">Szczegółowa struktura</div>
        <h1>${detail.name}</h1>
        <p>${detail.summary}</p>
        <div class="hero-actions">
          <a class="button primary" href="${detail.familyHref}">Wróć do ${detail.familyLabel}</a>
          ${
            detail.complexity
              ? `<a class="button" href="${detail.complexity.href}">${detail.complexity.label}</a>`
              : ""
          }
        </div>
      </section>

      <div class="grid">
        <section class="panel">
          <p class="path"><a href="../structures.html">Struktury danych</a> / <a href="${detail.familyHref}">${detail.familyLabel}</a> / ${detail.name}</p>
          <div class="tag">Gdzie to siedzi</div>
          <h2 class="mt-14">${detail.name}</h2>
          <p class="section-intro">${detail.summary}</p>

          <div class="card-grid mt-18">
            <article class="card">
              <h3>Najkrótsza intuicja</h3>
              <p>${detail.mainIdea}</p>
            </article>
            <article class="card">
              <h3>Kiedy używać</h3>
              ${renderList(detail.useWhen)}
            </article>
            <article class="card">
              <h3>Na co uważać</h3>
              ${renderList(detail.watchFor)}
            </article>
          </div>
        </section>

        ${renderLanguageDemo(detailKey, detail)}

        <section class="table-panel">
          <div class="tag gold">Właściwości</div>
          <h2 class="mt-14">Co warto pamiętać o tej strukturze</h2>
          <table class="mt-18">
            <thead>
              <tr>
                <th>Cecha</th>
                <th>Opis</th>
              </tr>
            </thead>
            <tbody>
              ${renderProperties(detail)}
            </tbody>
          </table>
        </section>

        <section class="panel">
          <div class="tag">Zobacz też</div>
          <h2 class="mt-14">Połączone miejsca w konspekcie</h2>
          <div class="card-grid mt-18">
            ${renderRelated(detail)}
          </div>
        </section>
      </div>
    </div>
  `;

  initLanguageDemos(root);
}

const detailKey = document.body.dataset.structureKey;
const detail = STRUCTURE_DETAILS[detailKey];

if (detail) {
  renderPage(detail, detailKey);
} else {
  document.getElementById("structure-detail-root").innerHTML = `
    <div class="page">
      <section class="panel">
        <h1>Nie znaleziono struktury</h1>
        <p class="section-intro">Ta podstrona nie ma jeszcze poprawnie podpiętych danych.</p>
        <div class="hero-actions">
          <a class="button primary" href="../structures.html">Wróć do structures.html</a>
        </div>
      </section>
    </div>
  `;
}
