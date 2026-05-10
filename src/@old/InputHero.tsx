function InputHero() {
  return (
    <>
      <div className="mini-block-media" style={{ minHeight: "1em" }}>
        <div className="media-copilot-prompt media-copilot-prompt--single-line media-copilot-prompt--interactive media-copilot-prompt--highlight-gradient-shift mini-block-media__media">
          <div
            className="media-copilot-prompt__container"
            style={{ width: "30em", fontSize: "1em" }}
          >
            <div className="media-copilot-prompt__container-background"></div>
            <div className="media-copilot-prompt__container-foreground">
              <div className="media-copilot-prompt__text-area">
                <div className="media-copilot-prompt__copilot-search">
                  <button
                    className="media-copilot-prompt__copilot-logo"
                    aria-label="open copilot"
                  >
                    <span className="icon-copilot-multicolor"></span>
                  </button>
                  <div className="media-copilot-prompt__input-slot">
                    {/* <input className="media-copilot-prompt__prompt-input" placeholder="Écrire à Copilot"> */}
                  </div>
                  <svg
                    fill="none"
                    viewBox="0 0 17 19"
                    height="1.3em"
                    width="1.1631578947368422em"
                    xmlns="http://www.w3.org/2000/svg"
                    className="px-icon media-copilot-prompt__icon"
                    aria-label="Launch Copilot Vision"
                  >
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      d="M8.498 0c.404 0 .737.298.79.684l.007.108v17.416a.794.794 0 0 1-.797.792.795.795 0 0 1-.79-.684l-.007-.108V.792c0-.438.357-.792.797-.792M4.52 3.167c.404 0 .737.297.79.684l.007.107v11.084a.794.794 0 0 1-.797.791.795.795 0 0 1-.79-.684l-.006-.107V3.958c0-.437.356-.791.796-.791m7.958 0c.404 0 .737.297.79.684l.007.107v11.084a.794.794 0 0 1-.797.791.796.796 0 0 1-.79-.684l-.007-.107V3.958c0-.437.357-.791.797-.791M.797 6.333c.403 0 .737.298.79.685l.007.107v4.75a.794.794 0 0 1-.797.792.795.795 0 0 1-.79-.685L0 11.875v-4.75c0-.437.357-.792.797-.792m15.406 0c.404 0 .737.298.79.685l.007.107v4.749a.794.794 0 0 1-.797.791.796.796 0 0 1-.79-.684l-.007-.107V7.125c0-.437.357-.792.797-.792"
                    ></path>
                  </svg>
                  <div
                    className="media-copilot-prompt__prompt-button media-copilot-prompt__prompt-button--embed"
                    data-bi-id="Button-Cta-AnimateIntroCopilotPrompt-Intro"
                  >
                    <div className="action-client-api-button">
                      <button className="common-button-v1 action-client-api-button__button action-client-api-button__button">
                        <span className="common-button-v1__content">
                          <svg
                            viewBox="0 0 18 18"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                            className="px-icon"
                            aria-hidden="true"
                          >
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              fill-rule="evenodd"
                              d="M1.207 7.733a.75.75 0 1 0 1.086 1.034l5.955-6.251V17.25a.75.75 0 0 0 1.5 0V2.516l5.954 6.251a.75.75 0 0 0 1.087-1.034L9.722.313a.995.995 0 0 0-.58-.3.754.754 0 0 0-.29.001.995.995 0 0 0-.578.3L1.207 7.733Z"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InputHero;
