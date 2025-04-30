
# 🌍🔊 Seismic Event Classification & Magnitude Prediction using Deep Learning  :   https://tremor-wave-oracle.lovable.app/

Welcome to an exciting and impactful AI project that bridges **machine learning**, **earth sciences**, and **disaster resilience**! In this project, we build a **multi-task deep learning model** to classify seismic events and predict their magnitudes from raw waveform data. 🌋🧠📈

---

## 📌 Project Overview

Seismic activities—like earthquakes, volcanic tremors, and even man-made explosions—generate unique ground motion signals. These can be captured by seismometers as waveform data.

🎯 **Goal**:  
- 🔍 **Classify** the seismic event type (e.g., Earthquake, Explosion, Tremor, Noise)  
- 📏 **Predict** the magnitude of earthquakes using raw waveform signals  

This project is built on real-world seismographic data and powered by **1D CNNs** and **LSTMs**, making it both scientifically rich and technically advanced.

---

## 🔬 Why This Project Matters

✅ **Mathematically Rich**: Integrates physics-based features (amplitude, frequency) with ML  
✅ **Space & Earth Data Fusion**: Combines Earthquake datasets with satellite-grade waveforms  
✅ **Multi-Task Learning**: Classification & Regression in one model  
✅ **Impactful**: Early detection of earthquakes saves lives  
✅ **Hackathon Ready**: Uncommon, futuristic, and real-world relevant  

---

## 📚 Dataset Sources

- 📦 **[Stanford Earthquake Dataset (STEAD)](https://www.kaggle.com/datasets/isevilla/stanford-earthquake-dataset-stead)**  
- 📦 **[USGS Earthquake Catalog + IRIS Waveform Data](https://earthquake.usgs.gov/earthquakes/search/)**  
- 📦 **NOAA Solar Flare Catalog** *(optional for space-weather correlation)*  

---

## 🧪 Exploratory Data Analysis (EDA)

🔎 **Waveform Inspection**  
- Visualize raw time-series data from seismometers  
- Compare Earthquake vs Explosion vs Noise signals  

🎨 **Spectrograms**  
- Frequency vs. Time plots to understand energy distribution  

📊 **Class Distribution**  
- Understand dataset balance and event prevalence  

💡 *EDA Insight*:  
> Explosions often have sharper, high-frequency spikes. Earthquakes exhibit gradual P-wave & S-wave patterns.

---

## 🏗️ Model Architecture

### ✅ Baseline
- 🔁 **1D CNN** for raw waveform feature extraction  
- ⏱️ **LSTM** for capturing temporal dependencies

### ✅ Final Model
> **Multi-Output Neural Network**  
- 🎯 **Head 1 (Classification)**: Predicts event type  
- 📏 **Head 2 (Regression)**: Predicts event magnitude

```plaintext
Input (6000x1) →
[Conv1D → Pooling]* →
LSTM →
Dense →
├── Classification (Softmax)
└── Magnitude Prediction (Linear)

