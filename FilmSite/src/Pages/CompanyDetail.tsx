import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCompanyDetail } from "../services/tmdbCompanyService";
import { Production } from "../interfaces/ProductionCompanies";
import { IMAGE_BASE_URL } from "../api/Api";

const CompanyDetails = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState<Production | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadCompany(companyId: number) {
    setLoading(true);
    try {
      const response = await fetchCompanyDetail(companyId);
      setCompany(response);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadCompany(Number(companyId));
  }, [companyId]);

  if (loading) return <p>Loading movies...</p>;
  if (!company)
    return (
      <p style={{ paddingTop: "60px", color: "black" }}>
        No company data found.
      </p>
    );

  return (
    <div className="moviedetail">
      <div className="moviedetailwidth">
        <div className="background">
          <div className="moviedetail-container">
            <img
              src={`${IMAGE_BASE_URL}${company.logo_path}`}
              alt={company.name}
              className="moviedetail-img"
            />
          </div>
          <div className="moviedetail-genres">
            <span className="movie-genre-badge">
              {company.name}, {company.origin_country},{company.description},
              {company.homePage}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
