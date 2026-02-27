/**
 * Theme-specific annotations for each work.
 *
 * This is where the "magic" happens - the same work gets different
 * 2-3 sentence descriptions depending on which thematic lens it's viewed through.
 *
 * Key: work slug (matches filename in content/works/)
 * Value: object mapping theme slugs to annotation text
 */

export const annotations: Record<string, Record<string, string>> = {

  // ============================================================
  // ALREADY COMPLETE (original annotations preserved)
  // ============================================================

  'social-media-giveth-2018': {
    'platforms-and-power': `Facebook's progressive API restrictions eliminated researchers' and users' capacity to access their own social graph data. This wasn't a privacy feature but rather a monopolization of the means of representation. Introduces "relational generativity" to describe platforms' systematic capture of users' network data.`,
    'networks-as-epistemology': `Platforms don't just restrict data access; they eliminate the capacity to produce alternative representations of social structure. By closing APIs while maintaining proprietary access, Facebook ensures only their algorithmic "routes" exist, never user-generated "maps." A case study in how technical architecture becomes epistemological constraint.`,
    'semantic-structures': `API closure demonstrates epistemic capture at infrastructure level. Users' social networks exist as local, context-dependent perceptions, but platforms force these into single global representations. An early example of the tension between local coherence and forced globalization that appears later in LLM alignment debates.`,
  },

  'presentation-of-self-2010': {
    'platforms-and-power': `Extends Goffman's dramaturgical framework to identify a new form of power in social media: the platform as curator. Unlike synchronous performances before co-present audiences, social media creates asynchronous "exhibitions" where algorithms decide what surfaces, when, and to whom.`,
    'networks-as-epistemology': `Introduces the performance/exhibition distinction that reframes how we understand mediated self-presentation. The shift from real-time interaction to curated display fundamentally changes what can be known about social actors and how that knowledge is produced.`,
  },

  // ============================================================
  // HIGH CONFIDENCE (content verified via abstracts / full text)
  // ============================================================

  'persistence-change-social-media-2010': {
    'platforms-and-power': `Identifies persistent social practices and long-term trajectories that underlie the seeming chaos of everyday social media use. Despite platform-specific affordances, enduring patterns of interaction reveal how technical infrastructure constrains and channels social behavior across platforms, users, and cultures.`,
  },

  'uneven-geographies-ugc-2014': {
    'platforms-and-power': `Demonstrates that internet connectivity alone cannot remedy global informational inequality, as some regions remain systematically underrepresented in user-generated content despite adequate infrastructure. Wikipedia's geographic coverage reveals how platform architecture and existing power structures reproduce and amplify real-world inequalities in knowledge production.`,
    'networks-as-epistemology': `Wikipedia's uneven geographic coverage is not merely a data quality problem but an epistemological one. The places that remain informationally impoverished on the platform become invisible in any analysis that takes Wikipedia as representative, creating a feedback loop where the absence of knowledge about a place ensures continued absence.`,
  },

  'racial-ethnic-biases-rental-housing-2011': {
    'platforms-and-power': `An audit study of Toronto Craigslist rental listings showing that "opportunity-denying" discrimination, where landlords simply do not respond to racialized names, was ten times more common than overt hostility. The platform's architecture, by enabling anonymous screening of applicants through email, creates new infrastructures for discrimination that operate through non-response rather than explicit exclusion.`,
    'methods-and-tools': `Develops an innovative audit methodology using 5,620 fictitious email inquiries sent to Craigslist landlords, each landlord receiving inquiries from five racialized name categories. The method enables large-scale discrimination testing at low cost by leveraging the affordances of online platforms for systematic field experiments.`,
  },

  'digital-divides-higher-education-2016': {
    'platforms-and-power': `Applies Weber's theory of stratification to the digital divide in Serbian higher education, finding that platform literacy, not mere access, determines who benefits from digital tools. The gap between students and instructors in digital skills creates hierarchies of competence that mirror and reinforce existing institutional power structures.`,
    'teaching-and-translation': `Offers a framework for understanding how digital literacy gaps between students and instructors can be addressed through institutional intervention. Translates the abstract concept of the "digital divide" into concrete pedagogical challenges and actionable strategies for higher education settings.`,
  },

  'pseudonyms-real-name-web-2012': {
    'platforms-and-power': `The shift from pseudonymous to real-name platforms represents a specific political turn, not a natural evolution of the web. Real-name policies like Google+'s and Facebook's solve a problem for platform owners, namely unified data profiles, while eliminating users' capacity to manage collapsed contexts and effectively forcing a single global identity where multiple local ones previously served.`,
    'semantic-structures': `The nymwars reveal a deep semantic problem: identity is contextually performed and locally coherent, but real-name policies force a single canonical referent. The pseudonym solved the technical problem of context-dependent meaning by allowing different names in different contexts, and its elimination collapses the many-to-one mapping between social roles and encoded identity.`,
  },

  'digital-inequalities-2-2020': {
    'platforms-and-power': `Twenty-five years after "the digital divide" was first identified, foundational access inequalities persist across class, gender, race, disability, and geography. Introduces the "digital inequality stack". This includes connectivity infrastructure through devices, skills, and production capacity, thereby showing how platform architectures layer new forms of exclusion atop legacy disparities.`,
  },

  'digital-inequalities-3-2020': {
    'platforms-and-power': `Companion to the 2.0 paper, focusing on novel inequalities spawned by the platform economy: algorithmic bias, automation-driven precarity, big data asymmetries, cybersafety gaps, and differential emotional well-being. These emergent inequalities are not merely extensions of old divides but structurally new forms of disadvantage created by platform architectures themselves.`,
  },

  'online-dating-comes-of-age-2011': {
    'platforms-and-power': `Cross-national survey of 17 countries reveals online dating as complement rather than substitute for offline meeting, with adoption highest among those over 40 re-entering the dating market. Platforms mediate who meets whom at scale, reconfiguring the opportunity structures for intimate relationship formation in ways that vary by age, gender, and cultural context.`,
    'networks-as-epistemology': `Cross-national data on online dating reveals that platforms don't merely facilitate existing relationship-seeking patterns but restructure who can know whom. The finding that online dating complements rather than substitutes for offline meeting challenges the binary framing of "online vs. offline" and reveals a more networked epistemology of intimacy.`,
  },

  'lgbtq-youth-identity-facebook-2018': {
    'platforms-and-power': `LGBTQ youth must navigate Facebook's architecture of enforced singular identity when their social reality requires selective disclosure to different audiences. The platform's collapsed context, presenting one profile to family, school, and queer community simultaneously, forces identity management strategies that range from uniformly "out" to carefully segmented, revealing how real-name platforms become sites of involuntary disclosure.`,
    'networks-as-epistemology': `Network analysis of LGBTQ youth reveals how different audience segments within a single Facebook ego network create competing demands for identity performance. The network structure itself, specifically the degree to which different social circles overlap or remain distinct, determines what kind of self-knowledge is possible in mediated environments.`,
  },

  'cmc-intimate-relationships-2017': {
    'platforms-and-power': `Examines how platform affordances create new vectors for relationship boundary violation, as online boundary crossing is linked to lower relationship satisfaction and partner responsiveness. The technological mediation of intimate relationships doesn't merely digitize existing dynamics; it introduces structurally new forms of intrusion enabled by always-on platform connectivity.`,
  },

  'facebook-groups-conversational-agency-2015': {
    'platforms-and-power': `Examines how pre-existing friendship ties structure conversation within Facebook groups, finding that network position shapes who speaks and who is heard. Platform-mediated group dynamics don't simply mirror offline social structures but instead create new patterns of conversational agency where structural position in the friendship network amplifies or dampens voice.`,
    'networks-as-epistemology': `Demonstrates that who speaks in Facebook groups is structured by pre-existing friendship networks, not just by topical interest or individual motivation. The finding that conversational agency is a network property challenges the assumption that open platforms create equal voice, revealing instead that existing social structure reproduces itself through the platform.`,
  },

  'relational-self-portrait-selfies-2014': {
    'platforms-and-power': `Social networking sites encourage users to construct "relational self-portraits," which are dynamic, selective digital selves that exist only through connections to others. The platform's architecture determines what aspects of identity become visible and to whom, making self-representation inseparable from the technical infrastructure that mediates it.`,
    'networks-as-epistemology': `The "relational self-portrait" concept captures how identity on social networking sites is constituted through connections rather than attributes alone. This is an epistemological claim about selfhood: who you are on a platform is inseparable from who you are connected to, making identity a network property rather than an individual one.`,
  },

  'invisible-algorithms-affordances-2015': {
    'platforms-and-power': `Critiques the shift from transparent ordering (alphabetical, chronological) to opaque machine learning-driven curation of online information. Argues that invisible algorithmic sorting represents an ideological choice rather than a neutral optimization, and explores alternative interactive affordances that could return agency to users through graph-based data presentation.`,
    'semantic-structures': `Machine learning-driven curation replaces explicit ordering logics (alphabetical, chronological) with opaque personalized relevance, severing the relationship between structure and meaning. Proposes data-as-graphs as an alternative paradigm that makes the relationships between items visible and navigable rather than hiding them behind black-box recommendation systems.`,
  },

  'breakup-encoding-love-2018': {
    'platforms-and-power': `Platforms encode relationships as static links that persist after lived relationships end, where "it's complicated" is Facebook's closest approximation to the chaos of a breakup. The gap between performed love and exhibited relationship status reveals how platform ontologies flatten the complexity of intimate life into machine-readable categories that serve the platform's logic, not the users'.`,
    'semantic-structures': `The relationship between lived experience and its platform encoding reveals a fundamental semantic gap: "it's complicated" is the richest category Facebook offers for the dissolution of a partnership. The forced mapping from continuous emotional states to discrete database categories exemplifies the broader problem of how technical ontologies flatten meaning, and this problem scales from relationship status to identity writ large.`,
  },

  'first-generation-students-facebook-2016': {
    'platforms-and-power': `The College Connect application used Facebook's social graph to visualize prospective college students' networks, with social media information access being significant only for first-generation students, those with the least institutional knowledge. Platform data, when made legible to users rather than hoarded by the platform, can redistribute informational advantage.`,
    'networks-as-epistemology': `Social media information access was significant only for first-generation students, those whose parents lacked college knowledge, demonstrating that the epistemological value of network connections is inversely related to institutional access. Networks don't just transmit information; they constitute it differently for differently positioned actors.`,
  },

  'mena-wikipedia-barriers-2013': {
    'platforms-and-power': `Maps persistent information asymmetries between the MENA region and the developed world on Wikipedia, finding that "openness" of a platform does not guarantee equitable participation. Structural barriers, whether linguistic, political, or infrastructural, mean that nominally open platforms reproduce existing geopolitical hierarchies of knowledge production.`,
  },

  'arabic-wikipedia-collective-knowledge-2015': {
    'platforms-and-power': `Examines low participation in and limited content within Arabic Wikipedia as a case study in how platform architecture interacts with linguistic, political, and infrastructural barriers to produce systematic knowledge gaps. The collective construction of knowledge is only as democratic as the conditions of participation allow.`,
  },

  'wikipedia-digital-divisions-labour-2015': {
    'platforms-and-power': `Maps Wikipedia participation to reveal "informational magnetism," the tendency for knowledge production to cluster around existing economic cores, creating virtuous cycles for the center and vicious cycles for the periphery. The relative democratization of internet access has not produced a concurrent democratization of voice and representation on platforms.`,
    'networks-as-epistemology': `"Informational magnetism" describes how knowledge production on Wikipedia gravitates toward existing economic cores, creating self-reinforcing cycles. This is an epistemological finding, not merely a distributional one: the geography of who produces knowledge determines what knowledge exists, and network effects ensure that initial advantages compound.`,
  },

  'sexting-british-adults-2022': {
    'platforms-and-power': `Qualitative analysis of 34 British adults' sexting experiences reveals how platform affordances shape intimate digital communication as "emotion work" governed by feeling rules around trust, desire, and shame. The technical mediation of intimate exchange creates new norms and vulnerabilities that don't exist in unmediated contexts.`,
  },

  'zoom-fatigue-2022': {
    'platforms-and-power': `Investigates the mechanisms linking camera-on Zoom use to mental exhaustion, finding that self-monitoring and social interaction anxiety mediate the relationship. Unlike telephone or text, the platform's architecture of mandatory mutual visibility imposes a specific cognitive and emotional burden that is unevenly distributed across personality types.`,
    'networks-as-epistemology': `The mediating role of self-monitoring in camera-on fatigue reveals that video platforms create a new form of reflexive self-knowledge through constant awareness of one's own visible performance. What users "know" about themselves in a Zoom meeting is fundamentally different from what they know in a phone call, because the platform makes self-perception an unavoidable component of interaction.`,
  },

  'platform-signals-reddit-2019': {
    'platforms-and-power': `Uses machine learning classifiers and platform metadata to distinguish between r/MensRights and r/MensLib on Reddit, showing how platform signals (voting patterns, cross-posting, moderation) shape the meaning of superficially similar discourse. The same words arrive at different politics through different platform-mediated contexts.`,
    'semantic-structures': `Demonstrates how the same words ("men's rights," "discrimination," "equality") arrive at radically different meanings in r/MensRights versus r/MensLib through the integration of platform metadata ("platform signals") with text classification. Semantic meaning cannot be recovered from text alone, because the context encoded in platform structures is essential for disambiguation.`,
  },

  'networks-are-lens-for-power-2021': {
    'platforms-and-power': `Argues that networks are not merely analytical tools but systematizing devices with power in their own right. Facebook, X, and LinkedIn are all networks of data representing people, and the critical question is not only "what can networks tell us?" but also "do the networks constrain us?"`,
    'networks-as-epistemology': `Argues that with advances in modelling and visualisation, we should ask not only what the networks can tell us, but whether the networks constrain us and our communication. Networks are both lens and cage, as they reveal social structure while simultaneously imposing structure on what can be seen.`,
  },

  'visualizing-personal-networks-2007': {
    'methods-and-tools': `Introduces participant-aided sociograms as an interview-based data collection method that extends traditional name generators by having respondents place alters on a visual diagram. Demonstrates both practical and methodological advantages of keeping "high technology in the lab and low technology in the field," since paper-based sociograms reduce respondent burden while capturing richer structural data than standard survey instruments.`,
    'networks-as-epistemology': `The participant-aided sociogram is not merely a data collection tool but an epistemological intervention. By having respondents place alters on a diagram and draw connections, it produces knowledge about social structure that is fundamentally different from name-generator lists: spatial, relational, and co-constructed between researcher and participant.`,
  },

  'collecting-social-network-data-travel-2007': {
    'methods-and-tools': `Develops a data collection instrument that explicitly links social networks to travel behavior through an egocentric approach, testing the hypothesis that individuals' travel is conditional on their social network structure. Demonstrates how survey and interview methods can be designed to capture the social dimension that transportation research had largely ignored.`,
    'networks-as-epistemology': `Demonstrates that travel behavior, seemingly a matter of individual choice and geography, is fundamentally structured by social networks. By making networks visible in transportation data, the study reveals a relational dimension of spatial behavior that individualistic models systematically miss, showing how the lens of analysis determines what can be known.`,
  },

  'analyzing-social-networks-internet-2008': {
    'methods-and-tools': `Provides a comprehensive methodological framework for analyzing social networks using internet-based data, covering ego networks, blogs, email, and social networking sites. Establishes best practices for online social network analysis at a moment when these methods were emerging but not yet standardized.`,
    'teaching-and-translation': `Serves as the entry point for social researchers encountering online network analysis for the first time, translating technical concepts into accessible methodology. By appearing in a widely-used methods handbook, it ensures that social network analysis is understood as a standard tool in the online research toolkit rather than a specialist technique.`,
  },

  'connected-lives-2006': {
    'methods-and-tools': `Documents the methodology and early findings of the Connected Lives study in Toronto, which combined surveys, interviews, and communication logs to study the interplay between ICTs, community, and domestic relationships. A methodological blueprint for studying networked individualism through mixed-methods approaches that capture both network structure and lived experience.`,
    'networks-as-epistemology': `The Connected Lives project operationalizes "networked individualism" as a researchable paradigm, showing that community is better understood through individual network structures than through geographic or group-based categories. What counts as "community" depends on the unit of analysis, and the network lens reveals patterns that group-based and place-based approaches cannot capture.`,
  },

  'facebook-social-capital-2014': {
    'methods-and-tools': `Addresses a surprising gap: prior work correlated Facebook use with social capital, but social capital is inherently structural, and little work related it to actual network structure. Uses Facebook ego network data to demonstrate how structural features of online networks, including density, clustering, and bridging, map onto different dimensions of social capital.`,
    'networks-as-epistemology': `Brings structural network analysis to the social capital debate, demonstrating that the relationship between Facebook use and social capital only becomes intelligible when ego network structure is examined. The structural lens reveals that not all Facebook connections are equal, as bridging ties, clustering, and density produce different forms of social capital that are invisible to frequency-of-use measures.`,
  },

  'agency-social-activity-ict-2008': {
    'methods-and-tools': `Develops methods for modeling interactions among face-to-face and electronic communication modes, demonstrating how ICT use patterns can be captured alongside travel behavior data. The data collection framework treats communication mode choice as a methodological variable, enabling researchers to study how different media serve different social network functions.`,
    'networks-as-epistemology': `Models how face-to-face and electronic communication modes interact within social networks, revealing that different media serve different relational functions rather than simply substituting for one another. The network perspective shows that communication mode choice is structured by relationship type and network position, not just individual preference.`,
  },

  'paper-to-screen-sociograms-2016': {
    'methods-and-tools': `Evaluates the digital translation of paper-based participant-aided sociograms to a touchscreen interface for use with high-risk populations (young MSM in Chicago). Finds that the screen-based tool produces comparable network data while reducing interviewer burden, validating the move from paper to the Network Canvas platform without sacrificing data quality.`,
  },

  'comparison-on-offline-networks-facebook-2009': {
    'methods-and-tools': `Early methodological work using the Facebook API to extract and compare egocentric network structures, demonstrating that online friendship networks, while larger, exhibit structural properties (clustering, density) that meaningfully correspond to offline social organization. Establishes the viability of platform APIs as tools for social network research.`,
    'networks-as-epistemology': `Compares the structural properties of online and offline ego networks, demonstrating meaningful correspondence in clustering and density. The finding that online networks are not structurally random but reflect offline social organization validates online network data as a legitimate epistemological source for understanding real social structure.`,
  },

  'online-social-networks-handbook-2016': {
    'methods-and-tools': `Updated methodological guide for collecting and analyzing online social network data, reflecting the significant changes in platform architectures since the first edition. Addresses the growing tension between researchers' analytical needs and platforms' progressive restriction of data access.`,
    'teaching-and-translation': `Updated for a landscape transformed by mobile platforms, API restrictions, and ethical concerns about user data, this chapter brings the methodological guidance into the current era. Serves as a practical bridge between the technical realities of contemporary platform architectures and the analytical needs of social researchers.`,
  },

  'assessing-stability-ego-networks-2020': {
    'methods-and-tools': `Tests whether apparent instability in egocentric networks across survey waves reflects genuine network churn or interview artifacts like anchoring and motivated underreporting. Uses Network Canvas to demonstrate that structural embeddedness predicts alter retention, providing empirical grounding for interpreting longitudinal ego network data.`,
    'networks-as-epistemology': `The instability of nominated network alters across survey waves raises a fundamental epistemological question: does the network change, or does the measurement change? By testing whether structural embeddedness predicts alter retention, this study distinguishes genuine network dynamics from measurement artifacts. The answer to "what is the network?" depends on how and when you look.`,
  },

  'network-canvas-key-decisions-2021': {
    'methods-and-tools': `Documents the key design decisions behind the Network Canvas software suite: Architect (protocol design), Interviewer (touch-optimized data collection), and Server (deployment management). Prioritizes usability and accessibility across platforms, addressing the chronic problem that self-reported social network studies are complex and burdensome for both researchers and participants.`,
  },

  'network-canvas-open-source-2023': {
    'methods-and-tools': `Introduces Network Canvas to the epidemiological community as an end-to-end open-source workflow for designing and conducting network interviews. Provides an accessible entry point for health researchers who need social network data but lack the technical infrastructure to build custom data collection tools.`,
  },

  'email-overload-scale-2006': {
    'methods-and-tools': `Develops and validates an eight-item survey scale for measuring email overload, showing it links well to actual user behavior across 292 subjects. A pragmatic methodological contribution that provides a standardized instrument for evaluating email management systems and studying workplace communication patterns.`,
  },

  'avoiding-gigo-2022': {
    'methods-and-tools': `Candidly documents the data collection failures of a social network study of university-industry collaboration in controlled radical polymerization, extracting transferable lessons about flexibility and adaptability in network data collection. A rare honest account of methodological failure that serves the field better than another success story.`,
  },

  'visualizing-facebook-nodexl-2010': {
    'methods-and-tools': `Provides practical guidance for visualizing and interpreting Facebook network data using the NodeXL platform, translating social network analysis techniques for a broader audience of researchers and practitioners. Demonstrates how network visualization tools can make structural patterns in social media data legible and analytically useful.`,
    'networks-as-epistemology': `Demonstrates how network visualization transforms Facebook data from flat friend lists into interpretable social structures. The act of visualization is itself an epistemological move, as it makes structural patterns (cliques, bridges, isolates) visible that are present in the data but invisible in the platform's default presentation.`,
  },

  'local-energy-governance-2013': {
    'methods-and-tools': `Applies social network analysis to map information and financial support exchanges between low-carbon community groups and other actors in Oxfordshire, UK. Demonstrates how network methods can illuminate the meso-level governance structures that shape local energy transitions, making visible the relational infrastructure that policy analysis typically ignores.`,
    'networks-as-epistemology': `Takes a network approach to energy governance, revealing the relational channels through which information and resources flow between community groups and institutional actors. The network lens makes visible a meso-level governance structure, neither individual action nor top-down policy, that shapes how local energy transitions actually happen.`,
  },

  'conversations-about-conservation-2019': {
    'methods-and-tools': `Uses mixed-method social network analysis across 85 interviews in six UK communities to understand how conversations influence energy practices. Identifies social factors that "open up" or "close down" energy discussions, including perceived stigma, thereby showing how network methods can reveal the social dynamics underlying behavioral change.`,
    'networks-as-epistemology': `Reveals that energy conservation practices are shaped not by information alone but by who people discuss energy issues with and in what social contexts. The network perspective shows that stigma around discussing energy creates structural silences, and what cannot be spoken about in a network cannot influence behavior through that network.`,
  },

  'facebook-network-evolution-2011': {
    'methods-and-tools': `Develops a conditional logistic framework for modeling tie creation in continuously-observed networks, enabling simultaneous estimation of multiple growth mechanisms (homophily, reciprocity, triadic closure, popularity). Applied to a Facebook-like community, the method advances beyond panel-data approaches to capture the fine-grained temporal dynamics of network evolution.`,
    'networks-as-epistemology': `Models how networks grow through multiple simultaneous mechanisms including homophily, reciprocity, triadic closure, and popularity, demonstrating that network evolution cannot be reduced to any single explanatory principle. The continuous-observation framework reveals temporal dynamics that panel-data snapshots miss, showing that when you look at a network determines what you see.`,
  },

  'forum-dynamics-time-decoupling-2013': {
    'methods-and-tools': `Proposes decoupling temporal information about forum users into event sequences and inter-event times, creating a novel feature space for analyzing communication patterns. Applied to 30,000+ users across four internet forums, the method reveals communication dynamics invisible to traditional approaches.`,
    'semantic-structures': `Develops a formal method for separating temporal user behavior into event sequences and inter-event time distributions, creating a new feature space that captures communicative patterns invisible to conventional analysis. The decoupling approach reveals that the meaningful structure in forum participation lies not in what users say but in the temporal signature of how they engage, offering a formal insight into the semantics of participation rhythms.`,
  },

  'social-metadata-email-triage-2007': {
    'methods-and-tools': `Explores how social network metadata extracted from email headers can be used to help users prioritize their inbox, leveraging the social structure embedded in communication patterns. A practical demonstration of how network analysis methods can improve information management tools.`,
  },

  'oxcovid19-database-2021': {
    'methods-and-tools': `Develops a comprehensive multimodal data repository integrating epidemiological, governmental, mobility, and weather data across countries at national and regional levels. A large-scale data infrastructure project demonstrating how interdisciplinary collaboration can produce research tools that serve the broader scientific community during a crisis.`,
  },

  'online-sexual-partner-seeking-2022': {
    'methods-and-tools': `Draws on qualitative interviews from the fourth British National Survey of Sexual Attitudes and Lifestyles (Natsal-4) to examine how adults use digital technologies for partner seeking. Applies a social practice framework to a sensitive research domain, demonstrating how qualitative methods can complement large-scale survey data.`,
  },

  'from-social-science-to-data-science-2023': {
    'methods-and-tools': `A Python textbook organized around the practical skills social scientists need: working with DataFrames, accessing web data and APIs, merging and cleaning datasets, and interpreting results. Bridges the gap between social science research questions and the computational tools required to answer them at scale.`,
    'teaching-and-translation': `Bridges social science methodology and Python programming, meeting social scientists where they are rather than requiring them to first become computer scientists. Supported by Jupyter notebooks, exercises, and video tutorials, it provides a complete pedagogical infrastructure for researchers transitioning to computational methods.`,
  },

  'measuring-predictability-life-outcomes-2020': {
    'methods-and-tools': `A mass collaboration of 160 teams using machine learning on rich longitudinal data (Fragile Families) found that life outcomes remain stubbornly unpredictable, with the best models barely exceeding simple benchmarks. Demonstrates the value of the "common task method" for social science while revealing practical limits to prediction that should concern policymakers using such models.`,
    'semantic-structures': `Despite comprehensive feature spaces and optimized machine learning, life outcomes remain stubbornly unpredictable, and prediction error was strongly associated with which family was being predicted rather than which technique was used. This reveals a fundamental limit of representation: even rich encodings cannot capture the complexity that determines individual trajectories, challenging the assumption that more data yields proportionally more predictive power.`,
  },

  // ============================================================
  // NETWORKS AS EPISTEMOLOGY (primary theme entries)
  // ============================================================

  'socioeconomic-inequality-social-networks-2011': {
    'networks-as-epistemology': `Examines how socioeconomic status shapes access to beneficial network resources, showing that the relationship between position in social structure and social capital is mediated by the networks through which resources flow. The network perspective reveals that inequality is not merely a matter of individual attributes but of differential positioning in relational systems.`,
  },

  'canadians-internet-civic-engagement-2008': {
    'networks-as-epistemology': `Large-scale survey data reveals that internet users spend more time alone yet are at least as socially engaged as non-users, a paradox only resolvable through network analysis. What looks like social isolation through one lens (time-use data) looks like networked participation through another (communication patterns), demonstrating that the framework determines the finding.`,
  },

  'video-game-use-relationships-2020': {
    'networks-as-epistemology': `Uses dyadic data from 6,756 couples across 16 countries to show that partner acceptance of video game use moderates the relationship between gaming and relationship satisfaction. The actor-partner interdependence model reveals that relationship outcomes are network properties, as they emerge from the interaction between partners' behaviors and attitudes rather than from individual characteristics alone.`,
  },

  // ============================================================
  // MEDIUM CONFIDENCE (content inferred from partial information)
  // Annotations based on titles, known context, and indirect sources.
  // These should be reviewed carefully against actual texts.
  // ============================================================

  'immanent-internet-2004': {
    'networks-as-epistemology': `Argues that the internet has become "immanent," woven into everyday life rather than constituting a separate sphere, and that this fundamentally changes the nature of citizenship and social participation. The concept of immanence reframes how we study the internet: not as a technology with effects, but as an infrastructure through which social life is increasingly constituted.`,
  },

  'immanent-internet-redux-2011': {
    'networks-as-epistemology': `Updates the immanent internet thesis for the mobile and social media era, noting that "the ethereal internet light that previously dazzled has now dimmed to a soft glow permeating everyday concerns." The internet's increasing invisibility as infrastructure paradoxically makes its epistemological effects harder to identify. The more immanent it becomes, the more it shapes what counts as knowledge without being recognized as doing so.`,
  },

  'information-networks-social-behavior-2007': {
    'methods-and-tools': `Bridges data engineering and social science by demonstrating how information networks, including the patterns in email, messaging, and online interaction, can be analyzed to understand social behavior. Provides a technical audience with a framework for seeing social structure in the digital traces they already collect.`,
    'networks-as-epistemology': `Argues that information networks, the patterns in email, messaging, and online interaction, provide a distinct epistemological window onto social behavior. What networks reveal about social life is not a subset of what surveys reveal; it is a fundamentally different kind of knowledge.`,
  },

  'internet-everyday-life-2004': {
    'networks-as-epistemology': `Provides an early conceptual framework for understanding how the internet integrates into daily routines, arguing against the "cyberspace vs. real life" dichotomy that dominated early internet studies. This framing shift, from the internet as a separate domain to the internet as embedded infrastructure, has epistemological consequences for how we study and understand digital social life.`,
    'teaching-and-translation': `An early reference work entry that helped establish the "internet in everyday life" framing for a broad audience, moving beyond the techno-utopian/dystopian binary of early internet studies. Provides accessible conceptual tools for researchers and students encountering internet studies for the first time.`,
  },

  'facebook-divides-us-2016': {
    'platforms-and-power': `Facebook's algorithmic filtering actively hides friends' views most likely to provoke disagreement, yielding "a doctored account of their personalities." This isn't a side effect but a design choice. The platform could use its knowledge of users to bridge divides, but instead optimizes for engagement by minimizing friction and systematically fragmenting shared reality.`,
  },

  'facebook-third-party-developers-2018': {
    'platforms-and-power': `In the wake of Cambridge Analytica, Facebook framed its API restrictions as a privacy measure. But this narrative obscures a simpler truth: closing third-party access while maintaining proprietary data monopoly is a power consolidation move dressed up as user protection.`,
  },

  'facebook-encyclopedia-2011': {
    'platforms-and-power': `Provides an overview of Facebook's technical architecture and its implications for social network analysis, at a moment when the platform was still relatively open to researchers. Documents the affordances and constraints of the platform in its pre-API-closure era, a baseline against which subsequent data monopolization can be measured.`,
    'teaching-and-translation': `Provides an authoritative reference entry on Facebook for scholars and students across disciplines, contextualizing the platform within social network theory. Encyclopedia entries serve a distinct pedagogical function, as they establish shared vocabulary and conceptual baselines for interdisciplinary audiences.`,
  },

  'social-media-encyclopedia-2015': {
    'platforms-and-power': `Defines and contextualizes social media platforms as technical systems with specific affordances for many-to-many communication, distinguishing them from earlier digital communication tools. Establishes a conceptual vocabulary for understanding how these platforms mediate social interaction at scale.`,
    'teaching-and-translation': `Defines social media for a behavioral sciences audience, establishing conceptual distinctions between platforms and prior communication technologies. Reference works of this kind shape how entire disciplines understand and teach about digital social phenomena.`,
  },

  'mixing-social-media-2015': {
    'platforms-and-power': `Uses the social life of vinyl records as an analogy to reconceptualize social media as many-to-many affordances rather than a unified technology suite. This reframing highlights how platform design choices about mixing, specifically what content surfaces alongside what other content, shape users' informational environments in ways that are invisible but consequential.`,
  },

  'platforms-as-actors-2013': {
    'platforms-and-power': `Argues that platforms must be understood as actors in network analysis, not merely as neutral infrastructure through which social action flows. Their algorithms, APIs, and personalization features actively shape the networks they host, making the platform itself a node of power rather than a passive medium.`,
    'networks-as-epistemology': `Challenges network analysis to account for platforms as actors, not passive infrastructure but entities that actively shape the networks they host. If platforms are actors, then network analysis without accounting for platform agency produces systematically incomplete knowledge about the social structures being studied.`,
  },

  'wikipedia-geographies-visualization-2012': {
    'platforms-and-power': `Presents an interactive visualization tool mapping every geolocated Wikipedia article worldwide, making visible the stark asymmetries in geographic representation. The tool itself demonstrates that platform data, when made accessible through alternative interfaces, can reveal structural inequalities that the platform's own interface obscures.`,
    'methods-and-tools': `Develops an interactive mapping tool that places every geolocated Wikipedia article on a world map, enabling visual analysis of geographic patterns in knowledge production. A demonstration of how visualization methods can transform large-scale platform data into legible spatial patterns.`,
  },

  'online-affairs-practitioners-2019': {
    'teaching-and-translation': `Translates academic research on internet infidelity into practical guidance for relationship counsellors and therapists, addressing a documented training gap. Developed through collaboration between researchers and the Tavistock Centre for Couple Relationships, it models how scholarly findings can be made actionable for professional practice.`,
  },

  // ============================================================
  // RECENT ADDITIONS (2024-2025)
  // ============================================================

  'self-disclosure-advice-reddit-2024': {
    'semantic-structures': `Examines how self-disclosure of age and gender in Reddit's r/Advice shapes the replies received, using hurdle negative binomial regression and discourse analysis. Reveals that the same advice request acquires different meaning depending on disclosed demographics, as "30F" and "30M" elicit structurally different responses, demonstrating that platform-encoded identity markers function as semantic context that transforms how text is interpreted.`,
    'platforms-and-power': `Self-disclosure on Reddit creates a trade-off between relatable context and identifiability, since posters who share age and gender receive more tailored advice but become more legible to the platform and its users. The study reveals how Reddit's pseudonymous architecture creates a disclosure economy where personal information becomes a currency exchanged for social support.`,
  },

  'social-prescribing-link-workers-2024': {
    'networks-as-epistemology': `Develops a conceptual framework for understanding how social prescribing link workers, who connect patients to community resources, navigate the relational structures between healthcare systems and local communities. The network position of link workers, bridging institutional medicine and informal community support, produces a distinct form of knowledge about patient needs that neither system generates alone.`,
    'methods-and-tools': `A meta-ethnographic synthesis of qualitative studies on link workers' experiences, developing a novel conceptual framework from across the existing literature. Demonstrates how systematic qualitative synthesis methods can produce theoretical understanding of a relational role that quantitative evaluation alone cannot capture.`,
  },

  'pornography-use-britain-2025': {
    'platforms-and-power': `Qualitative analysis of pornography use among British adults reveals how platform-mediated access to sexual content creates new stigma management challenges. Drawing on Meisenbach's theory of stigma management communication, finds that "avoiding" strategies such as hiding use, distancing from stigma, and making favorable comparisons are the dominant response, showing how platform affordances that enable private consumption simultaneously produce new social anxieties about disclosure.`,
  },

  'empathy-practices-social-media-2026': {
    'platforms-and-power': `Reveals how empathy operates differently across platform architectures by comparing Reddit and Stack Exchange communities with matched topics. What counts as appropriate empathetic response is shaped by platform norms and affordances — efficiency-driven spaces may treat emotional support as noise, while support-oriented spaces structurally mandate it. Challenges the assumption that more empathy is universally desirable in platform design.`,
    'methods-and-tools': `Develops a fine-grained annotation framework grounded in psychological theory that distinguishes six empathy-seeking and seven empathy-giving practices in online discourse, moving beyond binary or unidimensional empathy labels. Fine-tunes language models to detect these practices reliably, then applies them at scale across six communities, demonstrating a replicable pipeline from qualitative codebook development to large-scale computational analysis.`,
  },

  'proper-likeness-models-matter-2023': {
    'semantic-structures': `Develops the concept of "proper likeness" by analogy with Kripke's theory of proper names, arguing that a likeness functions as a rigid designator that fixes reference to a historically understood being rather than a bundle of visual features. Uses encoding and decoding from information theory and semiotics to formalise how likenesses are produced and interpreted, establishing an analytical foundation that extends beyond facial recognition to synthetic imagery generally.`,
    'platforms-and-power': `AI systems can now encode and render synthetic likenesses, decoupling visual identity from its bearer. This paper argues that without a coherent philosophical account of what constitutes a "proper" likeness, policy responses to deepfakes and generative imagery will conflate distinct problems. Provides the theoretical groundwork for the harms taxonomy developed in the companion paper with Bariach and McBride.`,
  },

  'harms-taxonomy-ai-likeness-2024': {
    'platforms-and-power': `Generative AI systems trained on sufficient images of a person can replicate their likeness without consent, creating a new category of platform-mediated harm. Presents a seven-category taxonomy of harms from synthetic likeness generation and distinguishes generation from distribution as separate vectors requiring distinct policy interventions.`,
    'semantic-structures': `Introduces "indexical sufficiency" to describe the threshold at which a generated image becomes recognisable as a specific person, formalising the relationship between training data and likeness fidelity. Traces how "likeness" has functioned in legal discourse and argues that AI-generated representations challenge existing frameworks by decoupling likeness from any originating act of depiction.`,
  },

  // P257 conference abstract — shares DOI with full paper
  'partner-services-social-network-2021': {
    'methods-and-tools': `Conference abstract presenting preliminary findings on online partner seeking from the Natsal-4 study, later developed into the full 2022 Journal of Sex Research paper. Documents the methodological approach to studying digital sexual health practices within a national survey framework.`,
  },

};

/**
 * Helper function to get annotation for a work under a specific theme.
 * Returns undefined if no annotation exists for that combination.
 */
export function getAnnotation(workSlug: string, themeSlug: string): string | undefined {
  return annotations[workSlug]?.[themeSlug];
}

/**
 * Get all themes a work has annotations for.
 */
export function getWorkThemes(workSlug: string): string[] {
  return Object.keys(annotations[workSlug] || {});
}
