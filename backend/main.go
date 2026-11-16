package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	mux := http.NewServeMux()
	registerAPI(mux)

	staticDir := os.Getenv("STATIC_DIR")
	if staticDir == "" {
		staticDir = findStaticDir()
	}
	if staticDir == "" {
		cwd, _ := os.Getwd()
		log.Fatalf("index.html tidak ditemukan. cwd=%s. Jalankan npm run build, atau set STATIC_DIR", cwd)
	}
	mux.Handle("/", spaHandler(staticDir))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	server := withCORS(logging(mux))
	log.Printf("Running on :%s, static dir: %s", port, staticDir)
	if err := http.ListenAndServe(":"+port, server); err != nil {
		log.Fatal(err)
	}
}

// Cari folder dist dari cwd dan beberapa parent directory.
// Ini mendukung dua layout umum:
//   - project/frontend/dist dengan backend dijalankan dari project
//   - project/frontend/dist dengan backend dijalankan dari project/backend
func findStaticDir() string {
	cwd, err := os.Getwd()
	if err != nil {
		return ""
	}

	var candidates []string
	current := cwd
	for level := 0; level < 5; level++ {
		candidates = append(candidates,
			filepath.Join(current, "frontend", "dist"),
			filepath.Join(current, "dist"))
		parent := filepath.Dir(current)
		if parent == current {
			break
		}
		current = parent
	}

	if exe, err := os.Executable(); err == nil {
		base := filepath.Dir(exe)
		candidates = append(candidates,
			filepath.Join(base, "frontend", "dist"),
			filepath.Join(base, "dist"))
	}

	for _, candidate := range candidates {
		if _, err := os.Stat(filepath.Join(candidate, "index.html")); err == nil {
			abs, _ := filepath.Abs(candidate)
			return abs
		}
	}
	return ""
}

func spaHandler(staticDir string) http.Handler {
	fileServer := http.FileServer(http.Dir(staticDir))
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// API yang tidak terdaftar: balas JSON 404, jangan kirim index.html
		if strings.HasPrefix(r.URL.Path, "/api/") {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusNotFound)
			w.Write([]byte(`{"error":"not found"}`))
			return
		}

		// File hasil build Vite (hash di nama file) boleh di-cache lama
		if strings.HasPrefix(r.URL.Path, "/assets/") {
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		}

		if r.URL.Path != "/" {
			p := filepath.Join(staticDir, filepath.Clean("/"+r.URL.Path))
			if info, err := os.Stat(p); err == nil && !info.IsDir() {
				fileServer.ServeHTTP(w, r)
				return
			}
		}

		// index.html jangan di-cache supaya tidak nyangkut build lama
		w.Header().Set("Cache-Control", "no-cache")
		http.ServeFile(w, r, filepath.Join(staticDir, "index.html"))
	})
}

func logging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s", r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	})
}

func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}
