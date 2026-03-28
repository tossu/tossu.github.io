# Spring

---

## Mikä on papu? 🫘

Bean on mikä tahansa Java-olio, jota Spring hallinnoi. Jos Spring luo sen, injektoi sen ja hallitsee sen elinkaarta, kyseessä on papu.

---

## Pavun elämäntehtävä

**Riippuvuuksien injektointi (Dependency Injection)**
Spring rakentaa olioverkon puolestasi. (@Autowired)

**Väljä kytkentä (Loose coupling)**
Luokat riippuvat rajapinnoista, eivät konkreettisista toteutuksista. Tehdään yksi asia ja pyritään välttämään suoraa riippuvuutta.

**Keskitetty elinkaaren hallinta**
Luonti, tuhoaminen, proxyt, transaktiot jne.

---

## Elinkaari (@scope)

<small>`singleton` - yksi instanssi (default)</small>

<small>`prototype` - yksi instanssi per käyttö (injection), eli uusi instanssi joka kerta kun ladataan</small>

<small>`request` - yksi instanssi per HTTP-pyyntö (web apps)</small>

<small>`session` - yksi instanssi per HTTP-session</small>

---

## Perus annotaatiot

`@Component` - Merkitsee luokan Spring-hallinnoiduksi paavuksi.

`@Service` - Sama kuin @Component, mutta semanttisesti liiketoimintalogiikalle.

`@Repository` - Sama idea, datakäyttökerroksia varten. Mahdollistaa myös poikkeuksien käännöksen.

`@Autowired` - Injektoi riippuvuudet tyypin mukaan.

`@Qualifier("beanName")` - Selventää, mikä papu tulee injektoida.

`@Value("${property.name}")` - Injektoi arvot konfiguraatiosta.

---

## Perus annotaatiot (jatkoa)

`@Configuration` - Merkitsee luokkaa bean-määritysten lähteeksi.

`@Bean` - Määrittelee beanin.

`@Profile("dev")` - Lataa beanit vain tietyille ympäristöille.

`@Primary` - Tekee beaanista oletusvalinnan, kun useita kandidaatteja on.

---

## Kontrollerit ja HTTP

`@RestController` - Kontrolleri, jossa metodit palauttavat JSONia/XML:ää suoraan, eli API -endpointit.

`@Controller` - MVC-kontrolleri näkymille (HTML-mallipohjat).

`@RequestMapping("/api")` - Peruspolun määrittely.

`@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping` - HTTP-metodikohtaiset kartoittajat.

`@RequestParam`, `@PathVariable`, `@RequestBody` - Sidokset pyynnön tietoihin metodiparametreilla.

`@MockBean` - Injektoi mokkeja Spring-kontekstiin.

---

## Luonti

```java
@Component
class MyComponent {}
```

```java
@Configuration
@Profile("dev")
class DevConfig {
  @Value("${app.greeting}")
  private String greeting;

  @Bean
  public MyService myService() {
    return new MyService(greeting);
  }
}
```

---

## Latausjärjestys

`@DependsOn("seppoService")` - Bean A ennen Bean B, joku siis vaatii seppoServicen toimiakseen

`@Primary` - Yksi oletusimplementaatio, jos useita toteutuksia on, tämä valitaan

`@Qualifier` - Tarkka bean, määrittelee tarkasti käytettävän pavun

```java
@Autowired
@Qualifier("seppoFormatter")
private Formatter formatter;
```

`@Lazy` - Laiska lataus, ladataan kun tarvitaan, voidaan välttää "circular dependencies" -virheitä

---

## Järjestetty lista beaneja

Käytä `@Order` määritykseen järjestyksen:

```java
@Component
@Order(1)
class A extends Seppo {
  public String getName() {
    return "A";
  }
}

@Component
@Order(2)
class B extends Seppo {
  public String getName() {
    return "B";
  }
}

@Autowired
List<Seppo> sepot;
```
