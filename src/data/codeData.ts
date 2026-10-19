import { JavaCodeSnippet, PresetScenario } from '../types';

export const ODEV_SNIPPETS: JavaCodeSnippet[] = [
  {
    id: 'odev-dowhile',
    title: 'do-while Döngüsü (Standart & Önerilen)',
    loopType: 'do-while',
    fileName: 'OdevCiftDortKati.java',
    description: 'Kullanıcıdan en az bir kez giriş alınması gerektiği için do-while döngüsü bu ödev için en ideal yapıdır.',
    code: `/**
 * Java 101 - Döngüler Ödevi
 * 
 * Soru: Java döngüler ile tek bir sayı girilene kadar kullanıcıdan girişleri
 * kabul eden ve girilen değerlerden çift ve 4'ün katları olan sayıları toplayıp
 * ekrana basan program.
 * 
 * @author Enes Öztürk
 * @version 1.0
 */
import java.util.Scanner;

public class OdevCiftDortKati {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int sayi;
        int toplam = 0;

        System.out.println("==================================================");
        System.out.println("       JAVA DÖNGÜLER ÖDEVİ - ENES ÖZTÜRK          ");
        System.out.println("  (Tek sayı girilene kadar çift ve 4'ün katı toplamı) ");
        System.out.println("==================================================");

        do {
            System.out.print("Lütfen bir sayı giriniz: ");
            sayi = scanner.nextInt();

            // 4'e kalansız bölünen her tam sayı zaten çifttir.
            // Dolayısıyla sayi % 4 == 0 kontrolü çift ve 4'ün katı şartını sağlar.
            if (sayi % 4 == 0) {
                toplam += sayi;
                System.out.println("-> " + sayi + " sayısı 4'ün katıdır, toplama eklendi! (Güncel: " + toplam + ")");
            } else if (sayi % 2 == 0) {
                System.out.println("-> " + sayi + " sayısı çifttir fakat 4'ün katı DEĞİLDİR, toplama eklenmedi.");
            }
        } while (sayi % 2 == 0); // Girilen sayı çift olduğu sürece devam et (tek sayı girilince sonlanır)

        System.out.println("\n--------------------------------------------------");
        System.out.println("Tek sayı (" + sayi + ") girildi! Döngü sonlandırıldı.");
        System.out.println("Girilen çift ve 4'ün katı olan sayıların toplamı: " + toplam);
        System.out.println("İmza: Enes Öztürk");
        System.out.println("--------------------------------------------------");

        scanner.close();
    }
}`
  },
  {
    id: 'odev-while',
    title: 'while(true) + break Yaklaşımı',
    loopType: 'break',
    fileName: 'OdevCiftDortKatiAlternatif.java',
    description: 'Sonsuz döngü başlatarak sayı girildikten sonra hemen tek sayı kontrolü yapıp break ile döngüyü kıran temiz yapı.',
    code: `/**
 * Java 101 - Döngüler Ödevi (Alternatif Çözüm)
 * Tek bir sayı girilene kadar 4'ün katlarını toplar.
 * 
 * @author Enes Öztürk
 */
import java.util.Scanner;

public class OdevCiftDortKatiAlternatif {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int toplam = 0;

        System.out.println("--- Enes Öztürk | Java Döngü Ödevi (Break Yaklaşımı) ---");

        while (true) {
            System.out.print("Sayı giriniz: ");
            int sayi = scanner.nextInt();

            // Tek sayı kontrolü: Eğer sayı tekse döngüyü hemen bitir
            if (sayi % 2 != 0) {
                System.out.println("Tek sayı girildi (" + sayi + "). Program bitti.");
                break;
            }

            // Çift ve 4'ün katı kontrolü
            if (sayi % 4 == 0) {
                toplam += sayi;
                System.out.println("-> " + sayi + " eklendi. Toplam: " + toplam);
            }
        }

        System.out.println("Sonuç Toplamı: " + toplam);
        System.out.println("Hazırlayan: Enes Öztürk");
        scanner.close();
    }
}`
  },
  {
    id: 'odev-standard-while',
    title: 'Standart while Döngüsü',
    loopType: 'while',
    fileName: 'OdevCiftDortKatiWhile.java',
    description: 'Döngü öncesinde ilk değeri alarak while koşulu içinde sayi % 2 == 0 kontrolü yapan klasik model.',
    code: `/**
 * Java 101 - Standart While ile Çözüm
 * @author Enes Öztürk
 */
import java.util.Scanner;

public class OdevCiftDortKatiWhile {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int toplam = 0;

        System.out.print("İlk sayıyı giriniz: ");
        int sayi = scan.nextInt();

        // Tek sayı girilmediği sürece dön
        while (sayi % 2 == 0) {
            if (sayi % 4 == 0) {
                toplam += sayi;
            }
            System.out.print("Sonraki sayıyı giriniz: ");
            sayi = scan.nextInt();
        }

        System.out.println("Toplam: " + toplam);
        System.out.println("Geliştirici: Enes Öztürk");
        scan.close();
    }
}`
  }
];

export const PRATIK_SNIPPETS: JavaCodeSnippet[] = [
  {
    id: 'pratik-dowhile',
    title: 'Negatif Değere Kadar Tek Sayı Toplama',
    loopType: 'do-while',
    fileName: 'TekSayiToplami.java',
    description: 'Negatif bir değer (sayı < 0) girilene kadar kullanıcıdan sayı alan ve yalnızca tek sayıları toplayan Java programı.',
    code: `/**
 * Java 101 - Pratik
 * Negatif bir değer girilene kadar kullanıcıdan girişleri kabul eden
 * ve girilen değerlerden tek sayıları toplayıp ekrana basan program.
 * 
 * @author Enes Öztürk
 */
import java.util.Scanner;

public class TekSayiToplami {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int sayi;
        int toplam = 0;

        System.out.println("==================================================");
        System.out.println("       TEK SAYILARI TOPLAMA PROGRAMI              ");
        System.out.println("      (Negatif sayı girilene kadar devam eder)    ");
        System.out.println("==================================================");

        do {
            System.out.print("Bir sayı giriniz: ");
            sayi = scanner.nextInt();

            // Pozitif ve tek sayı kontrolü (sayi % 2 != 0)
            if (sayi > 0 && sayi % 2 != 0) {
                toplam += sayi;
                System.out.println("-> " + sayi + " tek sayıdır, toplama eklendi! (Güncel: " + toplam + ")");
            } else if (sayi > 0) {
                System.out.println("-> " + sayi + " çift sayıdır, atlandı.");
            }
        } while (sayi >= 0); // Negatif sayı girilince sonlanır

        System.out.println("\n--------------------------------------------------");
        System.out.println("Negatif sayı (" + sayi + ") girildi! Döngü bitti.");
        System.out.println("Girilen tek sayıların toplamı: " + toplam);
        System.out.println("İmza: Enes Öztürk");
        System.out.println("--------------------------------------------------");

        scanner.close();
    }
}`
  }
];

export const ODEV_PRESETS: PresetScenario[] = [
  {
    id: 'preset-standard',
    title: 'Standart Karışık Test',
    description: '4, 8, 14, 20, 2, 7 (20 ve 4 katları toplanır, 7 tek sayı bitirir)',
    inputs: [4, 8, 14, 20, 2, 7],
    tag: 'Standart Örnek'
  },
  {
    id: 'preset-multiples',
    title: 'Yalnızca 4ün Katları',
    description: '12, 16, 24, 40, 9 (Tüm 4 katları toplanır, 9 tek sayı bitirir)',
    inputs: [12, 16, 24, 40, 9],
    tag: 'Maksimum Toplam'
  },
  {
    id: 'preset-even-not-four',
    title: '4e Bölünmeyen Çift Sayılar',
    description: '2, 6, 10, 14, 18, 3 (Hiçbiri 4ün katı değil, toplam 0 kalır)',
    inputs: [2, 6, 10, 14, 18, 3],
    tag: 'Filtreleme Testi'
  },
  {
    id: 'preset-instant-stop',
    title: 'İlk Sayıda Tek Girişi',
    description: '13 (İlk değer tek olduğu için döngü 1 adımda biter, toplam: 0)',
    inputs: [13],
    tag: 'Sınır Değer'
  },
  {
    id: 'preset-with-zeros',
    title: '0 ve Negatif Çiftler',
    description: '0, 4, 8, 12, 1',
    inputs: [0, 4, 8, 12, 1],
    tag: 'Sıfır Testi'
  }
];

export const PRATIK_PRESETS: PresetScenario[] = [
  {
    id: 'pratik-mix',
    title: 'Karışık Pozitif Sayılar',
    description: '5, 8, 11, 20, 7, 2, -1 (Tekler: 5 + 11 + 7 = 23)',
    inputs: [5, 8, 11, 20, 7, 2, -1],
    tag: 'Standart Test'
  },
  {
    id: 'pratik-all-odd',
    title: 'Yalnızca Tek Sayılar',
    description: '3, 7, 9, 15, 21, -5 (Tümü toplanır, -5 bitirir)',
    inputs: [3, 7, 9, 15, 21, -5],
    tag: 'Tüm Tekler'
  },
  {
    id: 'pratik-first-negative',
    title: 'İlk Sayıda Negatif',
    description: '-10 (İlk sayı negatif, döngü hemen biter, toplam: 0)',
    inputs: [-10],
    tag: 'Sınır Değer'
  }
];
