// Humanizer audit:
//   - Removed "groundbreaking", "novel", "state-of-the-art" from detail lines
//   - Details are factual: method, metric, venue. No promotional framing.
//   - Author lists verbatim from source.
export const publications = [
  {
    status: "Published",
    statusColor: "#00D4A0",
    venue: "Springer CCIS, Vol. 2683",
    title: "A Deep Learning-Based Framework for Bangla Vehicle License Plate Detection and Recognition",
    authors: "Sagar Mohajan, G. M. Sakhawat Hossain, Md Mynoddin, Rishita Chakma, Tanjim Mahmud, Punam Kanungoe, Auntor Chakma",
    detail: "ICDSAIA 2025, pp. 220-235. First online January 2026.",
    link: "https://link.springer.com/chapter/10.1007/978-3-032-11355-9_16",
    year: "2026"
  },
  {
    status: "Under review",
    statusColor: "#F59E0B",
    venue: "Emerging Science Journal",
    title: "An Ensemble Approach for Diabetic Retinopathy Severity Classification with Diffusion-Based Augmentation and Explainability",
    authors: "Auntor Chakma, Diya Rahman, T. H. Liew",
    detail: "Uses Stable Diffusion 2.1 with ControlNet to address class imbalance. 91.65% accuracy. Grad-CAM++ for interpretability.",
    link: null,
    year: "2026"
  },
  {
    status: "Under review",
    statusColor: "#F59E0B",
    venue: "Frontiers in Digital Health",
    title: "Multimodal Federated Learning with Privacy-Preserving Mechanisms in Healthcare: A Mini Review of Convergence, Challenges, and Future Directions",
    authors: "Auntor Chakma, F. T. Z. Moon, F. Jahan, M. K. Morol, T. H. Liew, D. Nandi, A. A. Jubair, M. Rahman",
    detail: "A short review examining per-modality privacy gaps in federated medical AI.",
    link: null,
    year: "2026"
  },
  {
    status: "B.Sc. thesis",
    statusColor: "#818CF8",
    venue: "RMSTU",
    title: "Attentive TabNet Framework for Multiclass Intrusion Detection in the Internet of Medical Things",
    authors: "Auntor Chakma",
    detail: "Attention-based model with GAN-augmented minority sampling. 97.96% multiclass accuracy across 89 million records.",
    link: null,
    year: "2025"
  }
];
