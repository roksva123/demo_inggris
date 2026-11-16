package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
)

type trialRequest struct {
	Name    string `json:"name"`
	Phone   string `json:"phone"`
	Grade   string `json:"grade"`
	Program string `json:"program"`
}

func registerAPI(mux *http.ServeMux) {
	mux.HandleFunc("/api/programs", getPrograms)
	mux.HandleFunc("/api/testimonials", getTestimonials)
	mux.HandleFunc("/api/tutors", getTutors)
	mux.HandleFunc("/api/stats", getStats)
	mux.HandleFunc("/api/trial", postTrial)
}

func writeJSON(w http.ResponseWriter, status int, value any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(value)
}

func getPrograms(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		writeJSON(w, http.StatusMethodNotAllowed, map[string]string{"error": "method not allowed"})
		return
	}
	writeJSON(w, http.StatusOK, programs)
}

func getTestimonials(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		writeJSON(w, http.StatusMethodNotAllowed, map[string]string{"error": "method not allowed"})
		return
	}
	writeJSON(w, http.StatusOK, testimonials)
}

func getTutors(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		writeJSON(w, http.StatusMethodNotAllowed, map[string]string{"error": "method not allowed"})
		return
	}
	writeJSON(w, http.StatusOK, tutors)
}

func getStats(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		writeJSON(w, http.StatusMethodNotAllowed, map[string]string{"error": "method not allowed"})
		return
	}
	writeJSON(w, http.StatusOK, stats)
}

func postTrial(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, map[string]string{"error": "method not allowed"})
		return
	}
	var req trialRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "format data tidak valid"})
		return
	}
	req.Name, req.Phone, req.Grade, req.Program = strings.TrimSpace(req.Name), strings.TrimSpace(req.Phone), strings.TrimSpace(req.Grade), strings.TrimSpace(req.Program)
	if len(req.Name) < 2 || len(req.Phone) < 8 || req.Grade == "" || req.Program == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "lengkapi data trial class terlebih dahulu"})
		return
	}
	log.Printf("TRIAL_REQUEST name=%q phone=%q grade=%q program=%q", req.Name, req.Phone, req.Grade, req.Program)
	writeJSON(w, http.StatusOK, map[string]any{"ok": true})
}
