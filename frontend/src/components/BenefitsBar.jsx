function BenefitsBar() {
  const benefits = [
    {
      icon: "📚",
      title: "Discover Books",
      description: "Explore books across genres"
    },
    {
      icon: "🎧",
      title: "Listen Anywhere",
      description: "Enjoy available audiobooks"
    },
    {
      icon: "📖",
      title: "Read Your Way",
      description: "Continue from where you left off"
    },
    {
      icon: "♡",
      title: "Your Personal Library",
      description: "Save books and favorites"
    }
  ];

  return (
    <section className="benefits-bar">
      {benefits.map((benefit) => (
        <div className="benefit-item" key={benefit.title}>
          <span className="benefit-icon">{benefit.icon}</span>

          <div>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default BenefitsBar;