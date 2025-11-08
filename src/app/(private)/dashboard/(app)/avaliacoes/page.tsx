"use client";

import { useState } from "react";
import {
  Star,
  MessageSquare,
  Eye,
  EyeOff,
  Reply,
  Filter,
  Search,
  Calendar,
  User,
  ThumbsUp,
  ThumbsDown,
  MoreVertical,
  Send,
  X,
  Check,
  AlertTriangle,
} from "lucide-react";

// Mock data
const reviewsData = [
  {
    id: 1,
    clientName: "João Silva",
    clientInitials: "JS",
    rating: 5,
    comment:
      "Excelente atendimento! O corte ficou perfeito e o ambiente é muito acolhedor. Recomendo!",
    date: "2024-02-15",
    service: "Corte Masculino",
    barber: "Pedro Santos",
    visible: true,
    responded: true,
    response:
      "Muito obrigado pelo feedback, João! Ficamos felizes em saber que gostou do resultado. Esperamos você em breve!",
    responseDate: "2024-02-16",
    helpful: 12,
    notHelpful: 1,
  },
  {
    id: 2,
    clientName: "Maria Oliveira",
    clientInitials: "MO",
    rating: 4,
    comment:
      "Bom atendimento, mas tive que esperar um pouco. O resultado final foi satisfatório.",
    date: "2024-02-14",
    service: "Sobrancelha",
    barber: "João Silva",
    visible: true,
    responded: false,
    response: "",
    responseDate: "",
    helpful: 8,
    notHelpful: 2,
  },
  {
    id: 3,
    clientName: "Carlos Lima",
    clientInitials: "CL",
    rating: 5,
    comment:
      "Melhor barbearia da região! Profissionais qualificados e preço justo. Sempre saio satisfeito.",
    date: "2024-02-13",
    service: "Combo Completo",
    barber: "Pedro Santos",
    visible: true,
    responded: true,
    response:
      "Carlos, muito obrigado pelas palavras! É um prazer atendê-lo sempre. Até a próxima!",
    responseDate: "2024-02-13",
    helpful: 15,
    notHelpful: 0,
  },
  {
    id: 4,
    clientName: "Ana Costa",
    clientInitials: "AC",
    rating: 2,
    comment:
      "Não gostei do atendimento. O profissional estava apressado e o resultado não ficou como esperado.",
    date: "2024-02-12",
    service: "Corte Feminino",
    barber: "Carlos Lima",
    visible: false,
    responded: true,
    response:
      "Ana, lamentamos muito pela experiência. Gostaríamos de conversar para entender melhor o que aconteceu. Entre em contato conosco.",
    responseDate: "2024-02-12",
    helpful: 3,
    notHelpful: 8,
  },
  {
    id: 5,
    clientName: "Roberto Santos",
    clientInitials: "RS",
    rating: 5,
    comment:
      "Ambiente limpo, profissionais competentes e preço acessível. Virei cliente fiel!",
    date: "2024-02-11",
    service: "Barba",
    barber: "João Silva",
    visible: true,
    responded: false,
    response: "",
    responseDate: "",
    helpful: 6,
    notHelpful: 0,
  },
];

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`size-[${size}px] ${
            star <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-[#363a3d]"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, onToggleVisibility, onRespond }: any) {
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [responseText, setResponseText] = useState(review.response || "");

  const handleSubmitResponse = () => {
    onRespond(review.id, responseText);
    setShowResponseForm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
      {/* Header */}
      <div className="flex items-start justify-between mb-[16px]">
        <div className="flex items-center gap-[12px]">
          <div className="w-[40px] h-[40px] bg-[#32f1b4] rounded-full flex items-center justify-center">
            <span className="text-black text-[14px] font-semibold">
              {review.clientInitials}
            </span>
          </div>
          <div>
            <div className="text-white text-[14px] font-semibold">
              {review.clientName}
            </div>
            <div className="flex items-center gap-[8px] text-[#9b9c9e] text-[12px]">
              <span>{formatDate(review.date)}</span>
              <span>•</span>
              <span>{review.service}</span>
              <span>•</span>
              <span>{review.barber}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[8px]">
          <StarRating rating={review.rating} />
          <div className="flex items-center gap-[4px]">
            <button
              onClick={() => onToggleVisibility(review.id)}
              className={`p-[6px] rounded-[6px] transition-colors ${
                review.visible
                  ? "text-green-400 hover:bg-green-500/20"
                  : "text-red-400 hover:bg-red-500/20"
              }`}
              title={review.visible ? "Ocultar avaliação" : "Mostrar avaliação"}
            >
              {review.visible ? (
                <Eye className="size-[16px]" />
              ) : (
                <EyeOff className="size-[16px]" />
              )}
            </button>
            <button className="p-[6px] text-[#9b9c9e] hover:text-white hover:bg-[#363a3d] rounded-[6px] transition-colors">
              <MoreVertical className="size-[16px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Comment */}
      <div className="mb-[16px]">
        <p className="text-[#9b9c9e] text-[14px] leading-relaxed">
          {review.comment}
        </p>
      </div>

      {/* Helpful votes */}
      <div className="flex items-center gap-[16px] mb-[16px]">
        <div className="flex items-center gap-[4px] text-[#9b9c9e] text-[12px]">
          <ThumbsUp className="size-[14px]" />
          <span>{review.helpful}</span>
        </div>
        <div className="flex items-center gap-[4px] text-[#9b9c9e] text-[12px]">
          <ThumbsDown className="size-[14px]" />
          <span>{review.notHelpful}</span>
        </div>
        <div
          className={`px-[8px] py-[2px] rounded-[4px] text-[10px] font-medium ${
            review.visible
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {review.visible ? "Público" : "Oculto"}
        </div>
      </div>

      {/* Response */}
      {review.responded && review.response && (
        <div className="bg-[#0d0f10] rounded-[8px] p-[16px] mb-[16px] border-l-4 border-[#32f1b4]">
          <div className="flex items-center gap-[8px] mb-[8px]">
            <div className="w-[24px] h-[24px] bg-[#32f1b4] rounded-full flex items-center justify-center">
              <span className="text-black text-[10px] font-semibold">BV</span>
            </div>
            <span className="text-white text-[12px] font-semibold">
              Barbearia Venust
            </span>
            <span className="text-[#9b9c9e] text-[10px]">
              {formatDate(review.responseDate)}
            </span>
          </div>
          <p className="text-[#9b9c9e] text-[13px] leading-relaxed">
            {review.response}
          </p>
        </div>
      )}

      {/* Response Form */}
      {showResponseForm && (
        <div className="bg-[#0d0f10] rounded-[8px] p-[16px] mb-[16px]">
          <div className="text-white text-[14px] font-medium mb-[12px]">
            Responder avaliação
          </div>
          <textarea
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Digite sua resposta..."
            className="w-full bg-[#1a1d21] border border-[#363a3d] rounded-[8px] px-[12px] py-[8px] text-white text-[14px] outline-none focus:border-[#32f1b4] h-[80px] resize-none mb-[12px]"
          />
          <div className="flex items-center gap-[8px]">
            <button
              onClick={handleSubmitResponse}
              className="bg-[#32f1b4] hover:bg-[#2cd9a0] rounded-[6px] px-[12px] py-[6px] text-black text-[12px] font-semibold transition-colors flex items-center gap-[4px]"
            >
              <Send className="size-[12px]" />
              Enviar
            </button>
            <button
              onClick={() => setShowResponseForm(false)}
              className="bg-[#363a3d] hover:bg-[#4a4f54] rounded-[6px] px-[12px] py-[6px] text-[#9b9c9e] text-[12px] font-medium transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-[8px]">
        {!review.responded && (
          <button
            onClick={() => setShowResponseForm(true)}
            className="bg-[#32f1b4] hover:bg-[#2cd9a0] rounded-[6px] px-[12px] py-[6px] text-black text-[12px] font-semibold transition-colors flex items-center gap-[4px]"
          >
            <Reply className="size-[12px]" />
            Responder
          </button>
        )}
        {review.responded && (
          <button
            onClick={() => setShowResponseForm(true)}
            className="bg-[#363a3d] hover:bg-[#32f1b4] hover:text-black rounded-[6px] px-[12px] py-[6px] text-[#9b9c9e] hover:text-black text-[12px] font-medium transition-colors flex items-center gap-[4px]"
          >
            <Reply className="size-[12px]" />
            Editar Resposta
          </button>
        )}
      </div>
    </div>
  );
}

export default function AvaliacoesPage() {
  const [reviews, setReviews] = useState(reviewsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredReviews = reviews
    .filter((review) => {
      const matchesSearch =
        review.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.service.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRating =
        ratingFilter === "all" || review.rating.toString() === ratingFilter;

      const matchesVisibility =
        visibilityFilter === "all" ||
        (visibilityFilter === "visible" && review.visible) ||
        (visibilityFilter === "hidden" && !review.visible);

      return matchesSearch && matchesRating && matchesVisibility;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  const handleToggleVisibility = (reviewId: number) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? { ...review, visible: !review.visible }
          : review,
      ),
    );
  };

  const handleRespond = (reviewId: number, responseText: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              responded: true,
              response: responseText,
              responseDate: new Date().toISOString().split("T")[0],
            }
          : review,
      ),
    );
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const totalReviews = reviews.length;
  const visibleReviews = reviews.filter((review) => review.visible).length;
  const pendingResponses = reviews.filter((review) => !review.responded).length;

  return (
    <div className="flex-1 flex flex-col bg-[#0d0f10] overflow-auto">
      {/* Header */}
      <div className="border-b border-[#363a3d] px-[32px] py-[24px]">
        <div className="flex flex-col gap-[8px]">
          <div className="font-['Plus_Jakarta_Sans:SemiBold',_sans-serif] font-semibold text-white text-[24px]">
            Avaliações
          </div>
          <div className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[#9b9c9e] text-[14px] tracking-[0.15px]">
            Gerencie as avaliações da sua barbearia
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-[32px]">
        <div className="max-w-[1200px] mx-auto space-y-[24px]">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[16px]">
            <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
              <div className="flex items-center gap-[12px]">
                <Star className="size-[20px] text-yellow-400" />
                <div>
                  <div className="text-white text-[20px] font-semibold">
                    {averageRating}
                  </div>
                  <div className="text-[#9b9c9e] text-[12px]">Nota Média</div>
                </div>
              </div>
            </div>
            <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
              <div className="flex items-center gap-[12px]">
                <MessageSquare className="size-[20px] text-blue-400" />
                <div>
                  <div className="text-white text-[20px] font-semibold">
                    {totalReviews}
                  </div>
                  <div className="text-[#9b9c9e] text-[12px]">
                    Total de Avaliações
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
              <div className="flex items-center gap-[12px]">
                <Eye className="size-[20px] text-green-400" />
                <div>
                  <div className="text-white text-[20px] font-semibold">
                    {visibleReviews}
                  </div>
                  <div className="text-[#9b9c9e] text-[12px]">Públicas</div>
                </div>
              </div>
            </div>
            <div className="bg-[#1a1d21] rounded-[12px] p-[20px] border border-[#363a3d]">
              <div className="flex items-center gap-[12px]">
                <AlertTriangle className="size-[20px] text-orange-400" />
                <div>
                  <div className="text-white text-[20px] font-semibold">
                    {pendingResponses}
                  </div>
                  <div className="text-[#9b9c9e] text-[12px]">Pendentes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-[16px]">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Buscar avaliações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1a1d21] border border-[#363a3d] rounded-[8px] pl-[40px] pr-[12px] py-[10px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
              />
              <Search className="absolute left-[12px] top-[50%] translate-y-[-50%] size-[16px] text-[#9b9c9e]" />
            </div>

            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="bg-[#1a1d21] border border-[#363a3d] rounded-[8px] px-[12px] py-[10px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
            >
              <option value="all">Todas as notas</option>
              <option value="5">5 estrelas</option>
              <option value="4">4 estrelas</option>
              <option value="3">3 estrelas</option>
              <option value="2">2 estrelas</option>
              <option value="1">1 estrela</option>
            </select>

            <select
              value={visibilityFilter}
              onChange={(e) => setVisibilityFilter(e.target.value)}
              className="bg-[#1a1d21] border border-[#363a3d] rounded-[8px] px-[12px] py-[10px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
            >
              <option value="all">Todas</option>
              <option value="visible">Públicas</option>
              <option value="hidden">Ocultas</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#1a1d21] border border-[#363a3d] rounded-[8px] px-[12px] py-[10px] text-white text-[14px] outline-none focus:border-[#32f1b4]"
            >
              <option value="newest">Mais recentes</option>
              <option value="oldest">Mais antigas</option>
              <option value="highest">Maior nota</option>
              <option value="lowest">Menor nota</option>
            </select>
          </div>

          {/* Reviews List */}
          <div className="space-y-[16px]">
            {filteredReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onToggleVisibility={handleToggleVisibility}
                onRespond={handleRespond}
              />
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-[40px]">
              <MessageSquare className="size-[48px] text-[#363a3d] mx-auto mb-[16px]" />
              <div className="text-[#9b9c9e] text-[16px] mb-[8px]">
                {searchTerm ||
                ratingFilter !== "all" ||
                visibilityFilter !== "all"
                  ? "Nenhuma avaliação encontrada"
                  : "Nenhuma avaliação ainda"}
              </div>
              <div className="text-[#9b9c9e] text-[14px]">
                {searchTerm ||
                ratingFilter !== "all" ||
                visibilityFilter !== "all"
                  ? "Tente ajustar os filtros de busca"
                  : "As avaliações dos clientes aparecerão aqui"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}